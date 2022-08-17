package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DeviceService {

    public List<Device> getAllDevice();
}
