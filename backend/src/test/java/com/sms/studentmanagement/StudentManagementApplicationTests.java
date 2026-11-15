package com.sms.studentmanagement;

import com.sms.studentmanagement.model.Student;
import com.sms.studentmanagement.repository.StudentRepository;
import com.sms.studentmanagement.service.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("h2")
class StudentManagementApplicationTests {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentRepository studentRepository;

    @BeforeEach
    void setUp() {
        studentRepository.deleteAll();
    }

    @Test
    @DisplayName("Test creating and retrieving a student")
    void testCreateAndGetStudent() {
        Student student = new Student("STU9999", "Test Student", "test.student@example.com", 
                                      "+1 555-0199", "Computer Science", "1st Year", "123 Campus Lane");
        Student saved = studentService.createStudent(student);

        assertNotNull(saved.getId());
        assertEquals("STU9999", saved.getStudentId());

        Student found = studentService.getStudentById(saved.getId());
        assertEquals("Test Student", found.getFullName());
    }

    @Test
    @DisplayName("Test updating student details")
    void testUpdateStudent() {
        Student student = new Student("STU8888", "Original Name", "original@example.com", 
                                      "+1 555-0188", "Mechanical Engineering", "2nd Year", "456 Old St");
        Student saved = studentService.createStudent(student);

        saved.setFullName("Updated Name");
        saved.setYearOfStudy("3rd Year");
        Student updated = studentService.updateStudent(saved.getId(), saved);

        assertEquals("Updated Name", updated.getFullName());
        assertEquals("3rd Year", updated.getYearOfStudy());
    }

    @Test
    @DisplayName("Test deleting a student")
    void testDeleteStudent() {
        Student student = new Student("STU7777", "To Delete", "delete.me@example.com", 
                                      "+1 555-0177", "Civil Engineering", "4th Year", "789 Demo Way");
        Student saved = studentService.createStudent(student);
        Long id = saved.getId();

        studentService.deleteStudent(id);
        assertThrows(RuntimeException.class, () -> studentService.getStudentById(id));
    }

    @Test
    @DisplayName("Test dashboard stats calculation")
    void testDashboardStats() {
        studentService.createStudent(new Student("STU101", "Student One", "s1@example.com", "+1 555-0101", "CS", "1st Year", "Address 1"));
        studentService.createStudent(new Student("STU102", "Student Two", "s2@example.com", "+1 555-0102", "CS", "2nd Year", "Address 2"));
        studentService.createStudent(new Student("STU103", "Student Three", "s3@example.com", "+1 555-0103", "IT", "1st Year", "Address 3"));

        var stats = studentService.getDashboardStats();
        assertEquals(3, stats.getTotalStudents());
        assertEquals(2, stats.getTotalDepartments());
        assertEquals(2, stats.getStudentsByDepartment().get("CS"));
        assertEquals(1, stats.getStudentsByDepartment().get("IT"));
    }
}
