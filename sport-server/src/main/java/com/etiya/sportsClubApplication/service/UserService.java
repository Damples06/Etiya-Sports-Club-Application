package com.etiya.sportsClubApplication.service;

import com.etiya.sportsClubApplication.dto.LoginDto;
import com.etiya.sportsClubApplication.dto.RegisterDto;
import com.etiya.sportsClubApplication.entity.Role;
import com.etiya.sportsClubApplication.entity.User;
import com.etiya.sportsClubApplication.exception.InvalidCredentialsException;
import com.etiya.sportsClubApplication.exception.RoleNotFoundException;
import com.etiya.sportsClubApplication.exception.UserExistException;
import com.etiya.sportsClubApplication.exception.UserNotFoundException;
import com.etiya.sportsClubApplication.mapper.UserMapper;
import com.etiya.sportsClubApplication.repository.RoleRepository;
import com.etiya.sportsClubApplication.repository.UserRepository;
import com.etiya.sportsClubApplication.security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;
    private JwtUtil jwtUtil;
    private UserMapper userMapper;

    public void register(RegisterDto registerDto) {
        if (userRepository.findByEmail(registerDto.getEmail()).isPresent()) {
            throw new UserExistException();
        }

        User user = userMapper.toEntity(registerDto);
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        Role memberRole = roleRepository.findByRoleName("ROLE_MEMBER").orElseThrow(() -> new RoleNotFoundException("Role not found"));
        user.setRoles(List.of(memberRole));

        userRepository.save(user);
    }

    public String login(LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        if (user == null ||  !passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Email or password is incorrect");
        }
        return
                jwtUtil.generateToken(user);
    }

    public Long getUserIdByLogin(LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return user.getId();
    }
}
