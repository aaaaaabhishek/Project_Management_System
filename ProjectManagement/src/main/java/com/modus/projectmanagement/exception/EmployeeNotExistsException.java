package com.modus.projectmanagement.exception;

public class EmployeeNotExistsException extends RuntimeException{

    public EmployeeNotExistsException(String message){
        super(message);
    }
}
