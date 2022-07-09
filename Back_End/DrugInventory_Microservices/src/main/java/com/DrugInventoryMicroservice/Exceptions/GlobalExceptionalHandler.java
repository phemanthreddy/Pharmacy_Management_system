package com.DrugInventoryMicroservice.Exceptions;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionalHandler {
	@ExceptionHandler(DrugNotFoundException.class)
	public ResponseEntity<String> drugNotFound(DrugNotFoundException e){
		return new ResponseEntity<String>("Drug Doesnot Exist",HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(DrugAlreadyExistException.class)
	public ResponseEntity<String> drugAlreadyExist(DrugAlreadyExistException e){
		return new ResponseEntity<String>("Drug Already exist",HttpStatus.BAD_REQUEST);
	}

}