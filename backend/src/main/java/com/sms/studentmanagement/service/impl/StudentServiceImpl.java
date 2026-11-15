package com.sms.studentmanagement.service.impl;

import com.sms.studentmanagement.exception.DuplicateResourceException;
import com.sms.studentmanagement.exception.ResourceNotFoundException;
import com.sms.studentmanagement.model.DashboardStats;
import com.sms.studentmanagement.model.Student;
import com.sms.studentmanagement.repository.StudentRepository;
import com.sms.studentmanagement.service.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    @Override
    public Student createStudent(Student student) {
        // Trim inputs
        student.setStudentId(student.getStudentId().trim().toUpperCase());
        student.setFullName(student.getFullName().trim());
        student.setEmail(student.getEmail().trim().toLowerCase());
        student.setPhoneNumber(student.getPhoneNumber().trim());
        student.setDepartment(student.getDepartment().trim());
        student.setYearOfStudy(student.getYearOfStudy().trim());
        student.setAddress(student.getAddress().trim());

        if (studentRepository.existsByStudentId(student.getStudentId())) {
            throw new DuplicateResourceException("Student ID '" + student.getStudentId() + "' is already registered.");
        }

        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new DuplicateResourceException("Email address '" + student.getEmail() + "' is already registered.");
        }

        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(Long id, Student studentDetails) {
        Student existing = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        String newStudentId = studentDetails.getStudentId().trim().toUpperCase();
        String newEmail = studentDetails.getEmail().trim().toLowerCase();

        // Check if studentId belongs to another student
        if (!existing.getStudentId().equalsIgnoreCase(newStudentId)) {
            Optional<Student> byStudentId = studentRepository.findByStudentId(newStudentId);
            if (byStudentId.isPresent() && !byStudentId.get().getId().equals(id)) {
                throw new DuplicateResourceException("Student ID '" + newStudentId + "' is already in use by another student.");
            }
        }

        // Check if email belongs to another student
        if (!existing.getEmail().equalsIgnoreCase(newEmail)) {
            Optional<Student> byEmail = studentRepository.findByEmail(newEmail);
            if (byEmail.isPresent() && !byEmail.get().getId().equals(id)) {
                throw new DuplicateResourceException("Email address '" + newEmail + "' is already in use by another student.");
            }
        }

        existing.setStudentId(newStudentId);
        existing.setFullName(studentDetails.getFullName().trim());
        existing.setEmail(newEmail);
        existing.setPhoneNumber(studentDetails.getPhoneNumber().trim());
        existing.setDepartment(studentDetails.getDepartment().trim());
        existing.setYearOfStudy(studentDetails.getYearOfStudy().trim());
        existing.setAddress(studentDetails.getAddress().trim());

        return studentRepository.save(existing);
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        studentRepository.delete(student);
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardStats getDashboardStats() {
        List<Student> students = studentRepository.findAll();
        long totalStudents = students.size();

        Map<String, Long> studentsByDepartment = students.stream()
                .collect(Collectors.groupingBy(Student::getDepartment, Collectors.counting()))
                .entrySet().stream()
                .sorted((e1, e2) -> Long.compare(e2.getValue(), e1.getValue()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

        Map<String, Long> studentsByYear = students.stream()
                .collect(Collectors.groupingBy(Student::getYearOfStudy, Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

        long totalDepartments = studentsByDepartment.keySet().size();

        return new DashboardStats(totalStudents, totalDepartments, studentsByDepartment, studentsByYear);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> searchStudents(String query) {
        if (query == null || query.trim().isEmpty()) {
            return studentRepository.findAll();
        }
        return studentRepository.searchStudents(query.trim());
    }
}
