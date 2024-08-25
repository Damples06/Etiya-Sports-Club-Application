package com.etiya.sportsClubApplication.dto;

import lombok.Data;

@Data
public class MemberDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
}
