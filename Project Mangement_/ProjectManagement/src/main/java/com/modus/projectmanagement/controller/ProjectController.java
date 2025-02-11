package com.modus.projectmanagement.controller;
import com.modus.projectmanagement.payload.ProjectDto;
import com.modus.projectmanagement.service.ProjectService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
@RestController
@RequestMapping("/api")
@Tag(name="Project controller")
public class ProjectController {
    private final ProjectService projectService;
    private final Environment environment;
    private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);
    public ProjectController(ProjectService iprojectService, Environment environment) {
        this.projectService = iprojectService;
        this.environment = environment;
    }
    @PostMapping("/createProject")
    @CircuitBreaker(name="createProjectbreaker" ,fallbackMethod= "createProjectFallback")
    @Retry(name="createProjectRetry" ,fallbackMethod = "createProjectFallback")
    @RateLimiter(name = "projectRateLimiter",fallbackMethod = "createProjectFallback")
    public ResponseEntity<Object> createProject(@RequestBody @Valid ProjectDto projectDto, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            List<String> errors = getErrorMessages(bindingResult);
            logger.error(" validation error occurred ProductDto:{} ,error:{}", projectDto, errors);
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        ProjectDto result=projectService.createProject(projectDto);
        if (result != null) {
            logger.info("Successfully created a new Project: {}", result);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }

        logger.warn("Project creation is failed");
        return new ResponseEntity<>(environment.getProperty("project.create.failure"),HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/getAllProject")
    @CircuitBreaker(name="getAllProjectbreaker" ,fallbackMethod="getAllProjectFallback")
    @Retry(name="createProjectRetry" ,fallbackMethod = "getAllProjectFallback")
    @RateLimiter(name = "projectRateLimiter",fallbackMethod = "getAllProjectFallback")
    public List<ProjectDto> getAllProject(){
        return projectService.getAllProject();
    }
    private List<String> getErrorMessages(BindingResult bindingResult) {
        return bindingResult.getAllErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .toList();
    }
    public ResponseEntity<ProjectDto> createProjectFallback(ProjectDto projectDto, BindingResult bindingResult, Throwable ex){
        logger.error("Fallback is executed because service is down {}",ex.getMessage());
        ex.printStackTrace();
        return new ResponseEntity<>(getFallbackProjectDto(), HttpStatus.BAD_REQUEST);
    }
    public ResponseEntity<List<ProjectDto>> getAllProjectFallback(Throwable ex){
        logger.error("Fallback is executed because service is down :{}",ex.getMessage());
        ex.printStackTrace();

        List<ProjectDto> fallbackProjects = Collections.singletonList(getFallbackProjectDto());
        return new ResponseEntity<>(fallbackProjects, HttpStatus.BAD_REQUEST);
    }
    private ProjectDto getFallbackProjectDto() {
        return ProjectDto.builder()
                .projectID(null)
                .projectName("No projects available")
                .startDate(String.valueOf(LocalTime.now()))
                .endDate(String.valueOf(LocalTime.now()))
                .projectType("N/A")
                .managerId(null)
                .build();
    }
}