package com.etiya.sportsClubApplication.dto;

import com.etiya.sportsClubApplication.entity.enums.Status;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ArrivalDto {
    private Long id;
    private Long userId;
    private Long courseBundleId;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate date;
    private Status status;
}
