package com.sms.studentmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class HealthController {

    @GetMapping({"/api/health", "/health", "/"})
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("service", "Student Management System API");
        status.put("timestamp", LocalDateTime.now());
        status.put("environment", System.getenv("SPRING_PROFILES_ACTIVE") != null 
                ? System.getenv("SPRING_PROFILES_ACTIVE") : "default");
        return ResponseEntity.ok(status);
    }
}
