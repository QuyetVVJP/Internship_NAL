package com.example.manage_device.controller;

import com.example.manage_device.model.Device;
import com.example.manage_device.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    public DeviceService deviceService;

    @GetMapping("/list")
    public List<Device> getAllDevice(){
        List<Device> deviceList = deviceService.getAllDevice();
        return deviceList;
    }

    @GetMapping("/device/{id}")
    public  Device getDeviceById(){
        return  null;
    }


}
