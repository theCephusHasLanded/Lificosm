FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /workspace/app

# Copy maven files for dependency resolution
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Make the wrapper executable
RUN chmod +x ./mvnw
# Build the application
RUN ./mvnw install -DskipTests
# Extract layers for smaller final image
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM eclipse-temurin:17-jre-alpine
VOLUME /tmp

# Install required packages for coturn STUN/TURN server
RUN apk add --no-cache coturn gettext

# Copy the STUN/TURN server configuration
COPY turnserver.conf /etc/turnserver.conf
COPY config-turnserver.sh /usr/local/bin/config-turnserver.sh

# Setup proper layering for Spring Boot
ARG DEPENDENCY=/workspace/app/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

# Create directory for recordings
RUN mkdir -p /var/recordings && chmod 777 /var/recordings

# Create startup script to run both services with environment variable substitution
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'echo "Configuring TURN server..."' >> /start.sh && \
    echo '/usr/local/bin/config-turnserver.sh' >> /start.sh && \
    echo 'echo "Starting TURN server..."' >> /start.sh && \
    echo 'turnserver -c /etc/turnserver.conf &' >> /start.sh && \
    echo 'echo "Starting Lificosm WebRTC application..."' >> /start.sh && \
    echo 'exec java -cp app:app/lib/* com.lificosm.webrtc.LificosmWebRTCApplication' >> /start.sh && \
    chmod +x /start.sh

EXPOSE 8080 3478/tcp 3478/udp 49152-65535/udp

ENTRYPOINT ["/start.sh"]