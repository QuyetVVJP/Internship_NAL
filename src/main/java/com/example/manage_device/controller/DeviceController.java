package com.example.manage_device.controller;

import com.example.manage_device.model.Device;
import com.example.manage_device.service.DeviceService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/devices")
public class DeviceController {
    private Logger logger = LoggerFactory.getLogger(DeviceController.class);
    @Value("${qr.code.directory}")
    private String qrCodeDirectory;
    @Autowired
    public DeviceService deviceService;

    @GetMapping("/list")
    public List<Device> getAllDevice(){
        List<Device> deviceList = deviceService.getAllDevice();
        String filePath = qrCodeDirectory + 1 + ".png";
        String qrCodeContent = "Simple Solution " + 1;
        int width = 400;
        int height = 400;
        boolean result = deviceService.generateQRCode(qrCodeContent, filePath, width, height);
        if(result) {
            logger.info("Generate QR code file " + filePath + " successfully");
        }
        return deviceList;
    }
}
