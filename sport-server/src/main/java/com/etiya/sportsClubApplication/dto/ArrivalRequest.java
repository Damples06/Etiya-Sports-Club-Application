package com.etiya.sportsClubApplication.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ArrivalRequest {
    public Long userId;
    public LocalDate date;
    public Long courseBundleId;
}
