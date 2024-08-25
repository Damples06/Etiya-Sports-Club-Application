package com.etiya.sportsClubApplication.mapper;

import com.etiya.sportsClubApplication.dto.*;
import com.etiya.sportsClubApplication.entity.CourseBundle;
import com.etiya.sportsClubApplication.entity.Role;
import com.etiya.sportsClubApplication.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "user.id", target = "id")
    @Mapping(source = "user.firstName", target = "firstName")
    @Mapping(source = "user.lastName", target = "lastName")
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "roles", target = "roles")
    @Mapping(source = "courseBundles", target = "courseBundle")
    UserDto toDto(User user);

    default List<String> mapRolesToRoleName(List<Role> roles) {
        return roles.stream()
                .map(Role::getRoleName)
                .collect(Collectors.toList());
    }

    @Mapping(source = "id", target = "id")
    @Mapping(source = "totalCourse", target = "totalCourse")
    @Mapping(source = "remainingCourses", target = "remainingCourse")
    @Mapping(source = "arrivals", target = "arrivals")
    CourseBundleDto toCourseBundleDto(CourseBundle courseBundle);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.firstName", target = "firstName")
    @Mapping(source = "user.lastName", target = "lastName")
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "id", target = "courseBundleId")
    @Mapping(source = "remainingCourses", target = "remainingCourse")
    UsersByRemainingCourseDto toUsersByRemainingCourseDto(CourseBundle courseBundle);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    @Mapping(source = "email", target = "email")
    MemberDto toMemberDto(User user);

    @Mapping(source = "registerDto.firstName", target = "firstName")
    @Mapping(source = "registerDto.lastName", target = "lastName")
    @Mapping(source = "registerDto.email", target = "email")
    @Mapping(target = "password", ignore = true)
    User toEntity(RegisterDto registerDto);
}
