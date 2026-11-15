package com.sms.studentmanagement.service;

import com.sms.studentmanagement.model.DashboardStats;
import com.sms.studentmanagement.model.Student;

import java.util.List;

public interface StudentService {
    List<Student> getAllStudents();
    Student getStudentById(Long id);
    Student createStudent(Student student);
    Student updateStudent(Long id, Student studentDetails);
    void deleteStudent(Long id);
    DashboardStats getDashboardStats();
    List<Student> searchStudents(String query);
}
