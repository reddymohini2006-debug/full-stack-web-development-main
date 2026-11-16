
# Stage 1: Build the Spring Boot application
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy the JAR from the builder stage
COPY --from=builder /app/target/student-management-1.0.0.jar app.jar

# Render port
ENV PORT=8080
EXPOSE 8080

# Start Spring Boot
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
