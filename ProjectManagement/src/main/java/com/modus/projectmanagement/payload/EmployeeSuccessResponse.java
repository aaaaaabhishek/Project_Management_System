package com.modus.projectmanagement.payload;

import lombok.Data;

@Data
public class EmployeeSuccessResponse {

    private int status;
    private String message;

    public EmployeeSuccessResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
