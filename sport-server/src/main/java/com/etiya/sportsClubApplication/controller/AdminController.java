package com.etiya.sportsClubApplication.controller;

import com.etiya.sportsClubApplication.dto.ArrivalDto;
import com.etiya.sportsClubApplication.dto.MemberDto;
import com.etiya.sportsClubApplication.dto.UserDto;
import com.etiya.sportsClubApplication.dto.UsersByRemainingCourseDto;
import com.etiya.sportsClubApplication.entity.CourseBundle;
import com.etiya.sportsClubApplication.service.AdminService;
import jakarta.validation.constraints.Min;
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
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200")
@Validated
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/sellCourseBundle")
    public ResponseEntity<String> sellCourseBundleToUser(@RequestParam @Min(1) @NotNull Long userId) {
        logger.info("Selling course bundle to user with id: {}", userId);

        //      This is a dummy course bundle with 10 courses. It will be changed in the future.
        CourseBundle courseBundle = new CourseBundle();
        courseBundle.setTotalCourse(10);
        courseBundle.setRemainingCourses(10);

        adminService.sellCourseBundleToUser(userId, courseBundle);
        return new ResponseEntity<>("Course bundle sold successfully", OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UsersByRemainingCourseDto>> getUsersByRemainingCourse(@RequestParam(name = "remainingCourses") @NotNull @Min(0) int i) {
        logger.info("Getting users with remaining courses: {}", i);

        List<UsersByRemainingCourseDto> members = adminService.getUsersByRemainingCourse(i);
        return members.isEmpty() ? new ResponseEntity<>(NOT_FOUND) : new ResponseEntity<>(members, OK);
    }

    @GetMapping("/users/courseless")
    public ResponseEntity<List<MemberDto>> getUsersWithoutCourse() {
        logger.info("Getting users without course");

        List<MemberDto> users = adminService.getUsersWithoutCourse();
        return users.isEmpty() ? new ResponseEntity<>(NOT_FOUND) : new ResponseEntity<>(users, OK);
    }


    @GetMapping("/users/all")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        logger.info("Getting all users");

        List<UserDto> users = adminService.getAllUsers();
        return users.isEmpty() ? new ResponseEntity<>(NOT_FOUND) : new ResponseEntity<>(users, OK);
    }

    @GetMapping("/calendar")
    public ResponseEntity<List<ArrivalDto>> getCalendar() {
        logger.info("Getting all calendar events");

        List<ArrivalDto> arrivals = adminService.getCalendar();
        return arrivals.isEmpty() ? new ResponseEntity<>(NOT_FOUND) : new ResponseEntity<>(arrivals, OK);
    }
}
