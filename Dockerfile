FROM adoptopenjdk/openjdk11:alpine-jre

WORKDIR /opt/

COPY ./BE-1.0-SNAPSHOT.jar /opt/

ENTRYPOINT ["java","-jar","BE-1.0-SNAPSHOT.jar"]