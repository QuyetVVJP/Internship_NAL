package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface DeviceService<Deveice> {

    public List<Device> getAllDevice();

    public Optional<Device> getDeviceByID(Long id);
    public Device createDevice();

    public Optional<Device> updateDevice(Long id);


    Device save(Device device);

    Optional<Object> findById(Long id);
}
