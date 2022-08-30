package com.example.manage_device.service;

import com.example.manage_device.model.DeviceLoan;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DeviceLoanService {
    List<DeviceLoan> getAllDeviceLoan();
}
