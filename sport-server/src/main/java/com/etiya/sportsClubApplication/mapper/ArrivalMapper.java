package com.etiya.sportsClubApplication.mapper;

import com.etiya.sportsClubApplication.dto.ArrivalDto;
import com.etiya.sportsClubApplication.entity.Arrival;
import com.etiya.sportsClubApplication.entity.CourseBundle;
import com.etiya.sportsClubApplication.entity.User;
import com.etiya.sportsClubApplication.entity.enums.Status;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;

@Mapper(componentModel = "spring")
public interface ArrivalMapper {

    ArrivalMapper INSTANCE = Mappers.getMapper(ArrivalMapper.class);

    @Mapping(source = "arrival.id", target = "id")
    @Mapping(source = "arrival.date", target = "date")
    @Mapping(source = "arrival.status", target = "status")
    @Mapping(source = "arrival.courseBundle.id", target = "courseBundleId")
    @Mapping(source = "user.firstName", target = "firstName")
    @Mapping(source = "user.lastName", target = "lastName")
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.id", target = "userId")
    ArrivalDto toDto(Arrival arrival, User user);

    @Mapping(source = "date", target = "date")
    @Mapping(source = "user", target = "user")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "courseBundle", target = "courseBundle")
    @Mapping(target = "id", ignore = true)
    Arrival toEntity(Status status, LocalDate date, User user, CourseBundle courseBundle);
}
