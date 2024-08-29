package com.etiya.sportsClubApplication.exception;

import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class CustomExceptionHandler {

    Logger logger = org.slf4j.LoggerFactory.getLogger(CustomExceptionHandler.class);

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        logger.error("User not found exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CourseBundleNotFoundException.class)
    public ResponseEntity<String> handleCourseBundleNotFoundException(CourseBundleNotFoundException ex) {
        logger.error("Course bundle not found exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoRemainingCoursesException.class)
    public ResponseEntity<String> handleNoRemainingCoursesException(NoRemainingCoursesException ex) {
        logger.error("No remaining courses exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ArrivalAlreadyExistsException.class)
    public ResponseEntity<String> handleArrivalAlreadyExistsException(ArrivalAlreadyExistsException ex) {
        logger.error("Arrival already exists exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidDateException.class)
    public ResponseEntity<String> handleInvalidDateException(InvalidDateException ex) {
        logger.error("Invalid date exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserDoesNotOwnCourseBundleException.class)
    public ResponseEntity<String> handleUserDoesNotOwnCourseBundleException(UserDoesNotOwnCourseBundleException ex) {
        logger.error("User does not own course bundle exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ArrivalNotActiveException.class)
    public ResponseEntity<String> handleArrivalNotActiveException(ArrivalNotActiveException ex) {
        logger.error("Arrival not active exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<String> handleRoleNotFoundException(RoleNotFoundException ex) {
        logger.error("Role not found exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserExistException.class)
    public ResponseEntity<String> handleUserExistException(UserExistException ex) {
        logger.error("User exist exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ArrivalNotFoundException.class)
    public ResponseEntity<String> handleArrivalNotFoundException(ArrivalNotFoundException ex) {
        logger.error("Arrival not found exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserDoesNotOwnArrivalException.class)
    public ResponseEntity<String> handleUserDoesNotOwnArrivalException(UserDoesNotOwnArrivalException ex) {
        logger.error("User does not own arrival exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<String> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        logger.error("Invalid credentials exception: {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
