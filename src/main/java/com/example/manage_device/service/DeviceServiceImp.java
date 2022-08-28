package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import com.example.manage_device.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DeviceServiceImp implements DeviceService {
    @Autowired
    DeviceRepository deviceRepository;
    @Override
    public List<Device> getAllDevice() {
        return deviceRepository.findAll();
    }

    @Override
    public Optional<Device> getDeviceByID(Long id) {
        return deviceRepository.findById(id);
    }

    @Override
    public Device createDevice() {
        return deviceRepository.save(new Device());
    }

    public Optional<Device> findById(Long id) {
        return deviceRepository.findById(id);

    }

    @Override
    public void delete(Long id) {
        deviceRepository.deleteById(id);
    }

    @Override
    public Device save(Device device) {
        return deviceRepository.save(device);

    }



}
