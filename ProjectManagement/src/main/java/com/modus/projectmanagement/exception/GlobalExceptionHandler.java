package com.modus.projectmanagement.exception;

import com.modus.projectmanagement.payload.EmployeeErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private final MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    public GlobalExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

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
    //This ExceptionHandler handles when exception comes during JSON parse because of incorrect JSON format
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> httpMessageNotReadableExceptionHandler(HttpMessageNotReadableException exception) {
        //If required make proper Response class for this response message
        return new ResponseEntity<>(
                messageSource.getMessage(
                        "EXCEPTION_JSON_INVALID",
                        null,
                        LocaleContextHolder.getLocale()
                ),
                HttpStatus.BAD_REQUEST
        );
    }

    //This ExceptionHandler handles exception when there is no mapping with requested url
//    @ExceptionHandler(NoResourceFoundException.class)
//    public ResponseEntity<String> noResourceFoundExceptionHandler(NoResourceFoundException exception){
//        //If required make proper Response class for this response message
//        return new ResponseEntity<>(
//                messageSource.getMessage(
//                        "EXCEPTION_URL_NOT_FOUND",
//                        null,
//                        LocaleContextHolder.getLocale()
//                ),
//                HttpStatus.NOT_FOUND
//        );
//    }

    //This ExceptionHandler is only for handling exceptions that occur during EmployeeDto validation.
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<EmployeeErrorResponse> handleInvalidEmployeeArgs(MethodArgumentNotValidException exception) {

        Map<String, String> errorMap = new HashMap<>();
        for (FieldError error : exception.getBindingResult().getFieldErrors())
            errorMap.put(error.getField(), error.getDefaultMessage());
        EmployeeErrorResponse employeeErrorResponse = new EmployeeErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                messageSource.getMessage(
                        "EXCEPTION_VALIDATION_FAILED",
                        null,
                        LocaleContextHolder.getLocale()
                ),
                errorMap
        );
        return new ResponseEntity<>(employeeErrorResponse, HttpStatus.BAD_REQUEST);
    }

    //This ExceptionHandler handles when EmployeeExistsException occur
    @ExceptionHandler(EmployeeExistsException.class)
    public ResponseEntity<EmployeeErrorResponse> handleEmployeeExistsException(EmployeeExistsException exception) {

        EmployeeErrorResponse employeeErrorResponse = new EmployeeErrorResponse(
                HttpStatus.CONFLICT.value(),
                exception.getMessage()
        );
        return new ResponseEntity<>(employeeErrorResponse, HttpStatus.CONFLICT);
    }

    //This ExceptionHandler handles when EmployeeNotExistsException occur
    @ExceptionHandler(EmployeeNotExistsException.class)
    public ResponseEntity<EmployeeErrorResponse> employeeNotExistsException(EmployeeNotExistsException exception) {

        EmployeeErrorResponse employeeErrorResponse = new EmployeeErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage()
        );
        return new ResponseEntity<>(employeeErrorResponse, HttpStatus.NOT_FOUND);
    }

}
