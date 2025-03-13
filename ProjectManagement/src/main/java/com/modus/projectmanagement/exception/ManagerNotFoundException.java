package com.modus.projectmanagement.exception;

public class ManagerNotFoundException extends RuntimeException{
    public ManagerNotFoundException(String msg) {
        super(msg);
    }
}
