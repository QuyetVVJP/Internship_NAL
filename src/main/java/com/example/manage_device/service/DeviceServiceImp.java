package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import com.example.manage_device.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DeviceServiceImp implements DeviceService {
    @Autowired
    DeviceRepository deviceRepository;
    @Override
    public List<Device> getAllDevice() {
        return deviceRepository.findAll();
    }

    @Override
    public Device save(Device device) {
        return deviceRepository.save(device);
    }
}
