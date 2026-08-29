package com.fitsmart.exception;

public class SelfDeactivationException extends RuntimeException {

    public SelfDeactivationException(String message) {
        super(message);
    }
}