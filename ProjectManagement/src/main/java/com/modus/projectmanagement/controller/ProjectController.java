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
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Tag(name="Project controller")
@CrossOrigin(origins = "http://localhost:3000")

public class ProjectController {
    private final ProjectService projectService;
    private final Environment environment;
    private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);
    public ProjectController(ProjectService iprojectService, Environment environment) {
        this.projectService = iprojectService;
        this.environment = environment;
    }
    @PostMapping("/createProject")
    @CircuitBreaker(name="createProject_breaker" ,fallbackMethod= "createProjectFallback")
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
    @CircuitBreaker(name="getAllProject_breaker" ,fallbackMethod="getAllProjectFallback")
    @Retry(name="createProjectRetry" ,fallbackMethod = "getAllProjectFallback")
    @RateLimiter(name = "projectRateLimiter",fallbackMethod = "getAllProjectFallback")
    public ResponseEntity<Page<ProjectDto>> getAllProject(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "20") int limit){
        Page<ProjectDto> projectDtos=projectService.getAllProject(page,limit);
        if(projectDtos!=null){
            logger.info("Project list  of the the data is extracted:{}",projectDtos);
            return new ResponseEntity<>(projectDtos,HttpStatus.ACCEPTED);
        }
        logger.warn("Project List extraction is failed");

        return new ResponseEntity<>(projectDtos,HttpStatus.BAD_GATEWAY);
    }
    @PutMapping("/changeProject")
    public ResponseEntity<ProjectDto> updateProject(@RequestBody ProjectDto projectDto){
        if(projectDto==null){
            return new ResponseEntity<>(projectDto,HttpStatus.BAD_REQUEST);
        }
        ProjectDto updatedProject=projectService.updateProject(projectDto);
        if(updatedProject!=null){
            return new ResponseEntity<>(updatedProject,HttpStatus.CREATED);
        }
        logger.warn("Project update is failed");

        return new ResponseEntity<>(updatedProject,HttpStatus.BAD_GATEWAY);
    }
    @DeleteMapping("/deleteProject")
    public ResponseEntity<Void> deleteProjectById( @RequestBody List<String> projectId){
          projectService.deleteProjectById(projectId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    private List<String> getErrorMessages(BindingResult bindingResult) {
        return bindingResult.getAllErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .toList();
    }
    public ResponseEntity<Object> createProjectFallback(ProjectDto projectDto, BindingResult bindingResult, Exception ex){
        logger.error("Fallback is executed because service is down {}",ex.getMessage());
        ex.printStackTrace();
        return new ResponseEntity<>(getFallbackProjectDto(), HttpStatus.BAD_REQUEST);
    }
    public ResponseEntity<List<ProjectDto>> getAllProjectFallback(Exception ex){
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
                .cost(null)
                .managerId(null)
                .build();
    }
}