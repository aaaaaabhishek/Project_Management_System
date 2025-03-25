package com.rest_api.keyclock_rest.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
@CrossOrigin("http://localhost:3000")

public class Abhi {
    @GetMapping
//    @PreAuthorize("hasRole('EMPLOYEE')")
    public void hello() {
        System.out.println("abhii");
    }
    @PostMapping("/j")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public String hello1() {
        return "Hello from Spring boot & Keycloak";
    }
}
