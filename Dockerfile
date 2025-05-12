# Use the official OpenJDK 21 image
FROM eclipse-temurin:21-jdk

# Set the working directory
WORKDIR /app

# Copy the JAR file to the container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 (Cloud Run uses this by default)
EXPOSE 8080

# Run the JAR file
CMD ["java", "-jar", "app.jar"]
