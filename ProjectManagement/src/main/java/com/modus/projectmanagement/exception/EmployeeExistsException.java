package com.modus.projectmanagement.exception;

public class EmployeeExistsException extends RuntimeException{

    public EmployeeExistsException(String message){
        super(message);
    }
}
