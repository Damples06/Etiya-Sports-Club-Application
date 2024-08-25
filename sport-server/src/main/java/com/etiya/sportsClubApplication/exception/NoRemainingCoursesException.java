package com.etiya.sportsClubApplication.exception;

public class NoRemainingCoursesException extends RuntimeException{
    public NoRemainingCoursesException(String message) {
        super(message);
    }
}
