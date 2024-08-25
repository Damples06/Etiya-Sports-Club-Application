package com.etiya.sportsClubApplication.exception;

public class UserDoesNotOwnCourseBundleException extends RuntimeException{
    public UserDoesNotOwnCourseBundleException(String message) {
        super(message);
    }
}
