package br.edu.ifpb.gugawag.apiDesastres.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. O Usuário digitou a senha errada
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentials(BadCredentialsException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("code", "BAD_CREDENTIALS");
        error.put("message", "Incorrect password.");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    // 2. O Usuário não existe no banco de dados
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUserNotFound(UsernameNotFoundException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("code", "USER_NOT_FOUND");
        error.put("message", "User not found. Redirecting to sign up...");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }
}