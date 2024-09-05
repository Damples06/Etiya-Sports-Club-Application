package com.etiya.sportsClubApplication.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ArrivalRequest {
    @NotNull(message = "User id is mandatory")
    public Long userId;

    @NotNull(message = "Date is mandatory")
    public LocalDate date;

    @NotNull(message = "Course bundle id is mandatory")
    public Long courseBundleId;
}
