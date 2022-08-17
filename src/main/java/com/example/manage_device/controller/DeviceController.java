package com.example.manage_device.controller;

import com.example.manage_device.model.Device;
import com.example.manage_device.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DeviceController {

    @Autowired
    private DeviceRepository deviceRepository;

    @GetMapping("/list-devices")
    public List<Device> getAllDevice(){
        List<Device> deviceList = deviceRepository.findAll();
        return deviceList;
    }
}
