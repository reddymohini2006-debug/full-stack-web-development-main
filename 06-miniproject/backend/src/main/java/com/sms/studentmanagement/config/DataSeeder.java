package com.sms.studentmanagement.config;

import com.sms.studentmanagement.model.Student;
import com.sms.studentmanagement.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataSeeder {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    @Bean
    CommandLineRunner initDatabase(StudentRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                log.info("No existing student records found. Seeding initial student records...");

                List<Student> initialStudents = Arrays.asList(
                    new Student("STU1001", "Aarav Sharma", "aarav.sharma@example.edu", "+91 98765 43210", 
                                "Computer Science", "3rd Year", "42 Tech Park Avenue, Bengaluru, Karnataka"),
                    new Student("STU1002", "Priya Patel", "priya.patel@example.edu", "+91 98123 45678", 
                                "Information Technology", "2nd Year", "15 Green Valley Road, Ahmedabad, Gujarat"),
                    new Student("STU1003", "Rahul Verma", "rahul.verma@example.edu", "+91 97234 56789", 
                                "Electronics & Communication", "4th Year", "88 Riverfront Towers, Pune, Maharashtra"),
                    new Student("STU1004", "Sneha Kulkarni", "sneha.kulkarni@example.edu", "+91 96345 67890", 
                                "Data Science", "1st Year", "23 Sunrise Residency, Hyderabad, Telangana"),
                    new Student("STU1005", "Vikram Singh", "vikram.singh@example.edu", "+91 95456 78901", 
                                "Mechanical Engineering", "3rd Year", "74 Industrial Corridor, Jaipur, Rajasthan"),
                    new Student("STU1006", "Ananya Iyer", "ananya.iyer@example.edu", "+91 94567 89012", 
                                "Computer Science", "4th Year", "12 Lake View Enclave, Chennai, Tamil Nadu"),
                    new Student("STU1007", "Rohan Mehta", "rohan.mehta@example.edu", "+91 93678 90123", 
                                "Civil Engineering", "2nd Year", "59 Hillcrest Blvd, Dehradun, Uttarakhand"),
                    new Student("STU1008", "Kavya Nair", "kavya.nair@example.edu", "+91 92789 01234", 
                                "Business Administration", "1st Year", "31 Coastal Drive, Kochi, Kerala")
                );

                repository.saveAll(initialStudents);
                log.info("Successfully seeded {} initial students into database.", initialStudents.size());
            } else {
                log.info("Database already contains {} student records. Skipping initial seeding.", repository.count());
            }
        };
    }
}
