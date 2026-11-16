-- =======================================================
-- Student Management System Database Initialization Script
-- Database: student_management
-- =======================================================

CREATE DATABASE IF NOT EXISTS student_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE student_management;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    department VARCHAR(80) NOT NULL,
    year_of_study VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_student_id (student_id),
    INDEX idx_email (email),
    INDEX idx_department (department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample students
INSERT INTO students (student_id, full_name, email, phone_number, department, year_of_study, address, created_at, updated_at) VALUES
('STU1001', 'Aarav Sharma', 'aarav.sharma@example.edu', '+91 98765 43210', 'Computer Science', '3rd Year', '42 Tech Park Avenue, Bengaluru, Karnataka', NOW(), NOW()),
('STU1002', 'Priya Patel', 'priya.patel@example.edu', '+91 98123 45678', 'Information Technology', '2nd Year', '15 Green Valley Road, Ahmedabad, Gujarat', NOW(), NOW()),
('STU1003', 'Rahul Verma', 'rahul.verma@example.edu', '+91 97234 56789', 'Electronics & Communication', '4th Year', '88 Riverfront Towers, Pune, Maharashtra', NOW(), NOW()),
('STU1004', 'Sneha Kulkarni', 'sneha.kulkarni@example.edu', '+91 96345 67890', 'Data Science', '1st Year', '23 Sunrise Residency, Hyderabad, Telangana', NOW(), NOW()),
('STU1005', 'Vikram Singh', 'vikram.singh@example.edu', '+91 95456 78901', 'Mechanical Engineering', '3rd Year', '74 Industrial Corridor, Jaipur, Rajasthan', NOW(), NOW()),
('STU1006', 'Ananya Iyer', 'ananya.iyer@example.edu', '+91 94567 89012', 'Computer Science', '4th Year', '12 Lake View Enclave, Chennai, Tamil Nadu', NOW(), NOW()),
('STU1007', 'Rohan Mehta', 'rohan.mehta@example.edu', '+91 93678 90123', 'Civil Engineering', '2nd Year', '59 Hillcrest Blvd, Dehradun, Uttarakhand', NOW(), NOW()),
('STU1008', 'Kavya Nair', 'kavya.nair@example.edu', '+91 92789 01234', 'Business Administration', '1st Year', '31 Coastal Drive, Kochi, Kerala', NOW(), NOW())
ON DUPLICATE KEY UPDATE full_name=VALUES(full_name);
