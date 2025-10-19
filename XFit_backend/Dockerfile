# ===========================
# Stage 1 — Build the Project
# ===========================
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first (for caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# ===========================
# Stage 2 — Run the Application
# ===========================
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the JAR from build stage
COPY --from=build /app/target/XFit_backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8090

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]