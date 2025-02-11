package com.modus.projectmanagement.controller;
import com.modus.projectmanagement.payload.ManagerDto;
import com.modus.projectmanagement.payload.ProjectDto;
import com.modus.projectmanagement.service.ManagerService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.util.Arrays;

@RestController
@RequestMapping("/api")
public class ManagerController {
    private final ManagerService managerService;
    private static final Logger logger= LoggerFactory.getLogger(ManagerController.class);
    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }
    @PostMapping(value = "/createManager")
    @CircuitBreaker(name="addManager_breaker" ,fallbackMethod="addManagerFallback")
    @Retry(name="addManagerRetry" ,fallbackMethod = "addManagerFallback")
    @RateLimiter(name = "ManagerRateLimiter",fallbackMethod = "addManagerFallback")

    public ResponseEntity<ManagerDto> addManager(@RequestBody ManagerDto managerdto){
        ManagerDto managerDto=managerService.addManager(managerdto);
        if(managerDto==null){
            return new ResponseEntity<>(managerDto, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(managerDto, HttpStatus.CREATED);
    }
    public ResponseEntity<ManagerDto> addManagerFallback(ManagerDto managerDto,Exception ex){
        logger.error("Fallback is executed because service is down :{}",ex.getMessage());
        ex.printStackTrace();
        ManagerDto fallbackManagerDto = ManagerDto.builder()
                .managerId(null)
                .managerName("Server down")
                .projects(Arrays.asList(
                        ProjectDto.builder()
                                .projectID(null)  // No project ID
                                .projectName("No projects available")
                                .startDate(String.valueOf(LocalTime.now()))
                                .endDate(String.valueOf(LocalTime.now()))
                                .projectType("N/A")
                                .managerId(null)
                                .build()
                ))

                .build();
        return new ResponseEntity<>(fallbackManagerDto, HttpStatus.BAD_REQUEST);
    }
}
