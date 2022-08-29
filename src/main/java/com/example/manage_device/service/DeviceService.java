package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface DeviceService {

    public List<Device> getAllDevice();
    public Optional<Device> getDeviceByID(Long id);
    public Device createDevice();
    public void delete(Long id);
    Device save(Device device);
    public Optional<Device> findById(Long id);

}
