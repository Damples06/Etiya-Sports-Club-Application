package com.etiya.sportsClubApplication.service;

import com.etiya.sportsClubApplication.dto.ArrivalDto;
import com.etiya.sportsClubApplication.dto.MemberDto;
import com.etiya.sportsClubApplication.dto.UserDto;
import com.etiya.sportsClubApplication.dto.UsersByRemainingCourseDto;
import com.etiya.sportsClubApplication.entity.CourseBundle;
import com.etiya.sportsClubApplication.entity.User;
import com.etiya.sportsClubApplication.exception.UserNotFoundException;
import com.etiya.sportsClubApplication.mapper.ArrivalMapper;
import com.etiya.sportsClubApplication.mapper.UserMapper;
import com.etiya.sportsClubApplication.repository.CourseBundleRepository;
import com.etiya.sportsClubApplication.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {
    private final UserRepository userRepository;
    private final CourseBundleRepository courseBundleRepository;
    private final ArrivalMapper arrivalMapper;
    private final UserMapper userMapper;

    public AdminService(UserRepository userRepository, CourseBundleRepository courseBundleRepository, ArrivalMapper arrivalMapper, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.courseBundleRepository = courseBundleRepository;
        this.arrivalMapper = arrivalMapper;
        this.userMapper = userMapper;
    }

    @Transactional
    public void sellCourseBundleToUser(Long userId, CourseBundle courseBundle) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found"));
        courseBundle.setUser(user);
        courseBundleRepository.save(courseBundle);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<UsersByRemainingCourseDto> getUsersByRemainingCourse(int i) {
        return courseBundleRepository.findByRemainingCourses(i).stream()
                .map(userMapper::toUsersByRemainingCourseDto)
                .collect(Collectors.toList());
    }

    public List<MemberDto> getUsersWithoutCourse() {
        return userRepository.findAll().stream()
                .filter(user -> user.getCourseBundles().isEmpty())
                .map(userMapper::toMemberDto)
                .collect(Collectors.toList());
    }

    public List<ArrivalDto> getCalendar() {
        return userRepository.findAll().stream()
                .flatMap(user -> user.getArrivals().stream()
                        .map(arrival -> arrivalMapper.toDto(arrival, user)))
                .collect(Collectors.toList());
    }
}
