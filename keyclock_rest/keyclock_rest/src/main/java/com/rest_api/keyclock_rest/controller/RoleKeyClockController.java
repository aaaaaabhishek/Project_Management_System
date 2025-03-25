package com.rest_api.keyclock_rest.controller;

import com.rest_api.keyclock_rest.service.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
@CrossOrigin("http://localhost:3000")

public class RoleKeyClockController {


    private final RoleService roleService;

    public RoleKeyClockController(RoleService roleService) {
        this.roleService = roleService;
    }


    @PutMapping("/assign/users/{userId}")
    public ResponseEntity<?> assignRole(@PathVariable String userId, @RequestParam String roleName) {

        roleService.assignRole(userId, roleName);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    @DeleteMapping("/remove/users/{userId}")
    public ResponseEntity<?> unAssignRole(@PathVariable String userId, @RequestParam String roleName) {

        roleService.deleteRoleFromUser(userId, roleName);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
