package com.modus.projectmanagement.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    @ExceptionHandler(ProjectCreationException.class)
    public ResponseEntity<String> getProjectCreationException(ProjectCreationException pce){
        logger.error("ProjectCreationException: {}", pce.getMessage(), pce);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error saving project: " + pce.getMessage());
    }
    @ExceptionHandler(ManagerNotFoundException.class)
    public ResponseEntity<String> managerNotFounExcepton(ManagerNotFoundException manager){
        logger.error("ManagerNotFoundException is not present: {}", manager.getMessage(), manager);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Manager id is not present: " + manager.getMessage());
    }
}
