package com.etiya.sportsClubApplication.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private List<String> roles;
    private List<CourseBundleDto> courseBundle;
}
