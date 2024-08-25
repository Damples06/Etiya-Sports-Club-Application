package com.etiya.sportsClubApplication.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseBundleDto {
    private Long id;
    private Long userId;
    private int totalCourse;
    private int remainingCourse;
    private List<ArrivalDto> arrivals;

}
