# Multi-stage Dockerfile for Student Management System (Spring Boot + Java 21)

# Stage 1: Build stage with Maven and OpenJDK 21
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copy pom.xml and download dependencies (leverages Docker layer cache)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy application source code and compile
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal Production JRE Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create a non-root service user for production security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy executable jar from builder stage
COPY --from=builder /app/target/student-management-1.0.0.jar app.jar

# Expose server port (Render dynamically sets PORT env var)
ENV PORT=8080
EXPOSE 8080

# Health check configuration
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/api/health || exit 1

# Start the Spring Boot application
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
