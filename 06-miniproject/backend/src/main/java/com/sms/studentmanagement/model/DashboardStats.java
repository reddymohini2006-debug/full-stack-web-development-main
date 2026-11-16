package com.sms.studentmanagement.model;

import java.util.Map;

public class DashboardStats {
    private long totalStudents;
    private long totalDepartments;
    private Map<String, Long> studentsByDepartment;
    private Map<String, Long> studentsByYear;

    public DashboardStats() {
    }

    public DashboardStats(long totalStudents, long totalDepartments, 
                          Map<String, Long> studentsByDepartment, 
                          Map<String, Long> studentsByYear) {
        this.totalStudents = totalStudents;
        this.totalDepartments = totalDepartments;
        this.studentsByDepartment = studentsByDepartment;
        this.studentsByYear = studentsByYear;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public Map<String, Long> getStudentsByDepartment() {
        return studentsByDepartment;
    }

    public void setStudentsByDepartment(Map<String, Long> studentsByDepartment) {
        this.studentsByDepartment = studentsByDepartment;
    }

    public Map<String, Long> getStudentsByYear() {
        return studentsByYear;
    }

    public void setStudentsByYear(Map<String, Long> studentsByYear) {
        this.studentsByYear = studentsByYear;
    }
}
