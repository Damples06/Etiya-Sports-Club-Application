package com.etiya.sportsClubApplication.controller;

import com.etiya.sportsClubApplication.dto.ArrivalDto;
import com.etiya.sportsClubApplication.dto.ArrivalRequest;
import com.etiya.sportsClubApplication.entity.Arrival;
import com.etiya.sportsClubApplication.entity.CourseBundle;
import com.etiya.sportsClubApplication.service.CalendarService;
import com.etiya.sportsClubApplication.service.MemberService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;


@RestController()
@RequestMapping("/member")
@CrossOrigin(origins = "http://localhost:4200")
@Validated
public class MemberController {

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    private final CalendarService calendarService;
    private final MemberService memberService;

    public MemberController(CalendarService calendarService, MemberService memberService) {
        this.calendarService = calendarService;
        this.memberService = memberService;
    }

    @PostMapping("/arrival")
    public ResponseEntity<String> createArrival(@Valid @RequestBody ArrivalRequest arrivalRequest) {
        logger.info("Creating arrival for user with id: {}", arrivalRequest.getUserId());

        calendarService.createArrival(arrivalRequest.getUserId(),arrivalRequest.getDate(),arrivalRequest.getCourseBundleId());
        return new ResponseEntity<>("Arrival created successfully", OK);
    }

    @GetMapping("/arrival")
    public ResponseEntity<List<Arrival>> getArrival(@RequestParam @NotNull Long userId) {
        logger.info("Getting arrival for user with id: {}", userId);

        List<Arrival> arrivals = calendarService.getArrival(userId);
        return arrivals.isEmpty() ? new ResponseEntity<>(NOT_FOUND) : new ResponseEntity<>(arrivals, OK);
    }

    @DeleteMapping("/arrival")
    public ResponseEntity<String> deleteArrival(@RequestParam @NotNull Long userId,@RequestParam @NotNull Long arrivalId) {
        logger.info("Deleting arrival with id: {}", arrivalId);

        calendarService.deleteArrival(userId,arrivalId);
        return new ResponseEntity<>("Arrival deleted successfully", OK);
    }

    @GetMapping("/coursebundles")
    public ResponseEntity<List<CourseBundle>> getCourseBundles(@RequestParam @NotNull Long userId) {
        logger.info("Getting course bundles for user with id: {}", userId);

        List<CourseBundle> courseBundles = memberService.getCourseBundles(userId);
        return courseBundles.isEmpty() ? new ResponseEntity<>(NOT_FOUND) : new ResponseEntity<>(courseBundles, OK);
    }

    @GetMapping("/calendar")
    public ResponseEntity<List<ArrivalDto>> getCalendar(@RequestParam @NotNull Long userId) {
        logger.info("Getting calendar for user with id: {}", userId);

        List<ArrivalDto> arrivals = memberService.getCalendar(userId);
        return arrivals.isEmpty() ? new ResponseEntity<>(NOT_FOUND) : new ResponseEntity<>(arrivals, OK);
    }
}
