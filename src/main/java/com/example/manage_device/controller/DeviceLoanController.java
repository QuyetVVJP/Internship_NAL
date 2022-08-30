package com.example.manage_device.controller;

import com.example.manage_device.model.Device;
import com.example.manage_device.model.DeviceLoan;
import com.example.manage_device.service.DeviceLoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/device-loan")
public class DeviceLoanController {

    @Autowired
    private DeviceLoanService deviceLoanService;

    @GetMapping("/list")
    public List<DeviceLoan> getAllDeviceLoan() {
        List<DeviceLoan> deviceList = deviceLoanService.getAllDeviceLoan();
        return deviceList;
    }
}
