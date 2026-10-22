package com.fitsmart.exception;

public class AlunoAlreadyLinkedException extends RuntimeException {
    public AlunoAlreadyLinkedException(String message) {
        super(message);
    }
}