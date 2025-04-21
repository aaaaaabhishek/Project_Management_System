package com.modus.projectmanagement.exception;

public class ManagerExistException extends RuntimeException{
    public ManagerExistException(String message){
        super(message);
    }
}
