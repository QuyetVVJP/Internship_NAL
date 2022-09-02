package com.example.manage_device;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ManageDeviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ManageDeviceApplication.class, args);
    }


}
