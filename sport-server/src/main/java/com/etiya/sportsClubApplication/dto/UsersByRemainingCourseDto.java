package com.etiya.sportsClubApplication.dto;

import lombok.Data;

@Data
public class UsersByRemainingCourseDto {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private Long courseBundleId;
    private int remainingCourse;
}
