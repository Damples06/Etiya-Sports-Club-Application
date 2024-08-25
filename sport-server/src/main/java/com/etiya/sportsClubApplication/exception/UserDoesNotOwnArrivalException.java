package com.etiya.sportsClubApplication.exception;

public class UserDoesNotOwnArrivalException extends RuntimeException{
    public UserDoesNotOwnArrivalException(String message) {
        super(message);
    }
}
