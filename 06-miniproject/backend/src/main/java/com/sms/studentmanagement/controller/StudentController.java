package com.sms.studentmanagement.controller;

import com.sms.studentmanagement.model.DashboardStats;
import com.sms.studentmanagement.model.Student;
import com.sms.studentmanagement.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*") // Global fallback, explicit config handled in CorsConfig
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * GET /api/students
     * Retrieve all students or filter by search query
     */
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents(
            @RequestParam(name = "search", required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(studentService.searchStudents(search));
        }
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    /**
     * GET /api/students/{id}
     * Retrieve a specific student by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    /**
     * GET /api/students/stats
     * Retrieve dashboard statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(studentService.getDashboardStats());
    }

    /**
     * POST /api/students
     * Add a new student
     */
    @PostMapping
    public ResponseEntity<Student> addStudent(@Valid @RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * PUT /api/students/{id}
     * Update existing student details
     */
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id, 
            @Valid @RequestBody Student studentDetails) {
        Student updated = studentService.updateStudent(id, studentDetails);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/students/{id}
     * Delete student by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deleted", true);
        response.put("message", "Student with ID " + id + " has been successfully deleted.");
        return ResponseEntity.ok(response);
    }
}
