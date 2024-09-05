package com.etiya.sportsClubApplication.controller;

import com.etiya.sportsClubApplication.dto.LoginDto;
import com.etiya.sportsClubApplication.dto.LoginResponse;
import com.etiya.sportsClubApplication.dto.RegisterDto;
import com.etiya.sportsClubApplication.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDto registerDto) {
        logger.info("Registering user with email: {}", registerDto.getEmail());

        userService.register(registerDto);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginDto loginDto) {
        logger.info("Logging in user with email: {}", loginDto.getEmail());

        String token = userService.login(loginDto);
        Long userId = userService.getUserIdByLogin(loginDto);
        LoginResponse loginResponse = new LoginResponse(token, userId);
        return ResponseEntity.ok(loginResponse);
    }
}
