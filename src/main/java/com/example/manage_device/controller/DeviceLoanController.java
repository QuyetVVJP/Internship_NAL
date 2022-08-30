package com.example.manage_device.controller;

import com.example.manage_device.model.Device;
import com.example.manage_device.model.DeviceLoan;
import com.example.manage_device.model.User;
import com.example.manage_device.model.request.DeviceLoanRequest;
import com.example.manage_device.service.DeviceLoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create")
    public DeviceLoan createDevice(@RequestBody DeviceLoanRequest deviceLoanRequest) {
        DeviceLoan deviceLoan = deviceLoanService.save(deviceLoanRequest);
        return deviceLoan;
    }
}
