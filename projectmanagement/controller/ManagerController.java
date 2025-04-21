package com.modus.projectmanagement.controller;
import com.modus.projectmanagement.payload.ManagerDto;
import com.modus.projectmanagement.payload.ProjectDto;
import com.modus.projectmanagement.service.ManagerService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000")
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
    @GetMapping("/getAllManager")
    public ResponseEntity<Page<ManagerDto>> getAllManger(@RequestParam(defaultValue = "0")int page,@RequestParam(defaultValue = "20") int limit){
       Page<ManagerDto> allMangerDtos= managerService.getAllManger(page,limit);
        return new ResponseEntity<>(allMangerDtos,HttpStatus.CREATED);
    }
    @GetMapping("/getManagerById/{managerId}")
    public ResponseEntity<ManagerDto> getManagerById(@PathVariable long managerId){
        ManagerDto managerDto=managerService.getManagerById(managerId);
        if(managerDto!=null){
            System.out.println(managerId);
            logger.info("ddddd",managerDto.getManagerId());
            return  new ResponseEntity<>(managerDto,HttpStatus.OK);
        }
        return new ResponseEntity<>(managerDto,HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/deleteManger")
    public ResponseEntity<Void> deleteManagerById(@RequestBody List<String> managerIds){
        managerService.deleteManagerById(managerIds);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/changeManagerDetails")
    public ResponseEntity<ManagerDto> changeManagerDetails(@RequestBody ManagerDto managerDto){
         ManagerDto updatedManagerDto=managerService.changeManagerDetails(managerDto);
         if(managerDto!=null){
             return new ResponseEntity<>(updatedManagerDto,HttpStatus.CREATED);
         }
         return new ResponseEntity<>(updatedManagerDto,HttpStatus.BAD_GATEWAY);
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
