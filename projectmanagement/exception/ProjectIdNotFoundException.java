package com.modus.projectmanagement.exception;

public class ProjectIdNotFoundException extends RuntimeException{
    public ProjectIdNotFoundException(String message){
    super(message);
    }
}
