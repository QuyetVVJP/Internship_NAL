package com.example.manage_device.service;

import com.example.manage_device.model.DeviceLoan;
import com.example.manage_device.repository.DeviceLoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DeviceLoanServiceImpl implements DeviceLoanService{

    @Autowired
    private DeviceLoanRepository deviceLoanRepository;
    @Override
    public List<DeviceLoan> getAllDeviceLoan() {
        return deviceLoanRepository.findAll();
    }
}
