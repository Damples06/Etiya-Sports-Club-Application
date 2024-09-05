package com.etiya.sportsClubApplication.exception;

public class UserExistException extends RuntimeException{
    public UserExistException() {
        super("User already exist");
    }
}
