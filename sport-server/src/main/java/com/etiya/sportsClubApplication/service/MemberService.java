package com.etiya.sportsClubApplication.service;

import com.etiya.sportsClubApplication.dto.ArrivalDto;
import com.etiya.sportsClubApplication.entity.CourseBundle;
import com.etiya.sportsClubApplication.exception.CourseBundleNotFoundException;
import com.etiya.sportsClubApplication.mapper.ArrivalMapper;
import com.etiya.sportsClubApplication.repository.CourseBundleRepository;
import com.etiya.sportsClubApplication.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberService {

    private final CourseBundleRepository courseBundleRepository;
    private final UserRepository userRepository;
    private final ArrivalMapper arrivalMapper;

    public MemberService(CourseBundleRepository courseBundleRepository, UserRepository userRepository, ArrivalMapper arrivalMapper) {
        this.courseBundleRepository = courseBundleRepository;
        this.userRepository = userRepository;
        this.arrivalMapper = arrivalMapper;
    }

    public List<CourseBundle> getCourseBundles(Long userId) {
        List<CourseBundle> courseBundles = courseBundleRepository.findByUserId(userId);
        if (courseBundles.isEmpty()) {
            throw new CourseBundleNotFoundException("User has no course bundle");
        }
        return courseBundles;
    }

    public List<ArrivalDto> getCalendar(Long userId) {
        return userRepository.findById(userId).stream()
                .flatMap(user -> user.getCourseBundles().stream()
                        .flatMap(courseBundle -> courseBundle.getArrivals().stream()
                                .map(arrival -> arrivalMapper.toDto(arrival, user))))
                .collect(Collectors.toList());
    }
}
