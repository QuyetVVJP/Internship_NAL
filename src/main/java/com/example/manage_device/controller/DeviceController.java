package com.example.manage_device.controller;

import com.example.manage_device.model.Device;
import com.example.manage_device.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping("/list")
    public List<Device> getAllDevice() {
        List<Device> deviceList = deviceService.getAllDevice();
        return deviceList;
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<?> getDeviceById(@PathVariable Long id) {
        Optional<Device> result = deviceService.getDeviceByID(id);
        return  ResponseEntity.ok(result);
    }
    @PostMapping("/list")
    public Device createDevice(@RequestBody Device device) {
        return  deviceService.save(device);
    }
}
