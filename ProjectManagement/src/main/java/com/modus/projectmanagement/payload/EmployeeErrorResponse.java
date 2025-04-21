package com.modus.projectmanagement.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Map;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL) //This will exclude null value fields
public class EmployeeErrorResponse {

    private int status;
    private String message;
    private Map<String, String> errors;

    //This ErrorResponse for list of errors.
    public EmployeeErrorResponse(int status, String message, Map<String, String> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    //This ErrorResponse for a particular single error.
    public EmployeeErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
