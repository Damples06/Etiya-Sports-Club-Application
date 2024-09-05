package com.etiya.sportsClubApplication.service;

import com.etiya.sportsClubApplication.entity.Arrival;
import com.etiya.sportsClubApplication.entity.CourseBundle;
import com.etiya.sportsClubApplication.entity.User;
import com.etiya.sportsClubApplication.entity.enums.Status;
import com.etiya.sportsClubApplication.exception.*;
import com.etiya.sportsClubApplication.mapper.ArrivalMapper;
import com.etiya.sportsClubApplication.repository.ArrivalRepository;
import com.etiya.sportsClubApplication.repository.CourseBundleRepository;
import com.etiya.sportsClubApplication.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class CalendarService {

    private final UserRepository userRepository;
    private final ArrivalRepository arrivalRepository;
    private final CourseBundleRepository courseBundleRepository;
    private final ArrivalMapper arrivalMapper;
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(CalendarService.class);

    public CalendarService(UserRepository userRepository, ArrivalRepository arrivalRepository, CourseBundleRepository courseBundleRepository, ArrivalMapper arrivalMapper) {
        this.userRepository = userRepository;
        this.arrivalRepository = arrivalRepository;
        this.courseBundleRepository = courseBundleRepository;
        this.arrivalMapper = arrivalMapper;
    }

    public void createArrival(Long userId, LocalDate date, Long courseBundleId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found"));
        CourseBundle courseBundle = courseBundleRepository.findById(courseBundleId).orElseThrow(() -> new CourseBundleNotFoundException("Course bundle with id " + courseBundleId + " not found"));
        Status status;
        if (!courseBundle.getUser().equals(user)) {
            throw new UserDoesNotOwnCourseBundleException("User does not own course bundle");
        }
        if (!(arrivalRepository.findByUserAndDate(user, date) == null) && arrivalRepository.findByUserAndDate(user, date).getStatus().equals(Status.ACTIVE))
            throw new ArrivalAlreadyExistsException("Arrival already exists");
        if (courseBundle.getRemainingCourses() == 0)
            throw new NoRemainingCoursesException("User has no remaining courses");
        if (date.isBefore(LocalDate.now())) {
            throw new InvalidDateException("Date is not valid");
        } else {
            status = Status.ACTIVE;
        }

        courseBundle.setRemainingCourses(courseBundle.getRemainingCourses() - 1);
        courseBundleRepository.save(courseBundle);

        Arrival arrival = arrivalMapper.toEntity(status, date, user, courseBundle);
        arrivalRepository.save(arrival);
    }

//  This method is used to update the status of the arrivals. If the date of the arrival is before the current date and the status of the arrival is active, the status of the arrival is updated to past.
    @Scheduled(cron = "0 0 0 * * *")
    @PostConstruct
    public void updateArrivalStatuses() {
        logger.info("Updating arrival statuses");
        List<Arrival> arrivals = arrivalRepository.findAll();
        for (Arrival arrival : arrivals) {
            if (arrival.getDate().isBefore(LocalDate.now()) && arrival.getStatus().equals(Status.ACTIVE)) {
                arrival.setStatus(Status.PAST);
                arrivalRepository.save(arrival);
            }
        }
    }

    public List<Arrival> getArrival(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return arrivalRepository.findByUser(user);
    }

    public void deleteArrival(Long userId,Long arrivalId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
        Arrival arrival = arrivalRepository.findById(arrivalId).orElseThrow(() -> new ArrivalNotFoundException("Arrival not found"));
        if (!arrival.getUser().equals(user)) {
            throw new UserDoesNotOwnArrivalException("User does not own arrival");
        }
        if (!arrival.getStatus().equals(Status.ACTIVE)) {
            throw new ArrivalNotActiveException("Arrival is not active");
        }
        arrival.setStatus(Status.PASSIVE);
        CourseBundle courseBundle = arrivalRepository.findCourseBundleByArrivalId(arrivalId);
        courseBundle.setRemainingCourses(courseBundle.getRemainingCourses() + 1);
        arrivalRepository.save(arrival);
    }
}
