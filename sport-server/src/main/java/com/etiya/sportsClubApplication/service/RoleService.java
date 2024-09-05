package com.etiya.sportsClubApplication.service;

import com.etiya.sportsClubApplication.entity.Role;
import com.etiya.sportsClubApplication.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void init(){
        createRoleIfNotExists(1L, "ROLE_ADMIN");
        createRoleIfNotExists(2L, "ROLE_MEMBER");
    }

    private void createRoleIfNotExists(Long id, String roleName){
        if (roleRepository.findByRoleName(roleName).isEmpty()){
            Role role = new Role(id, roleName);
            roleRepository.save(role);
            logger.info("Role with name: {} is created", roleName);
        } else {
            logger.info("Role with name: {} already exists", roleName);
        }
    }
}
