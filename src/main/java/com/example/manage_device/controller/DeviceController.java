package com.example.manage_device.controller;

import com.example.manage_device.exception.ResourceNotFoundException;
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
        return deviceService.save(device);
    }

    @PutMapping("/list/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long id,@RequestBody Device deviceDetails) throws Throwable {

        Device device = (Device) deviceService.updateDevice(id)
                .orElseThrow( () -> new ResourceNotFoundException("Device khong ton tai:" + id));
        device.setCreate_at(deviceDetails.getCreate_at());
        device.setDevice_name(deviceDetails.getDevice_name());
        device.setUpdate_at(deviceDetails.getUpdate_at());
        device.setOS(deviceDetails.getOS());
        device.setDevice_name(deviceDetails.getDevice_name());
        device.setInformation(deviceDetails.getInformation());
        device.setManufacturer(deviceDetails.getManufacturer());
        device.setStatus(deviceDetails.getStatus());
        device.setPath_QR(device.getPath_QR());

        Device updateDevice = deviceService.save(device);
        return ResponseEntity.ok(updateDevice);
    }
}