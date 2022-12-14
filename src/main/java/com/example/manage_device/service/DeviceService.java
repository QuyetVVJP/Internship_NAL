package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface DeviceService {

    List<Device> getAllDevice();
    Optional<Device> getDeviceByID(Long id);
    void delete(Long id);

//    Optional<Device> updateDevice(Long id);

    Device save(Device device);
    Optional<Device> findById(Long id);

    Page<Device> searchByKeyword(String term, Pageable paging);

    Long getTotal();

    Long getTotalDeviceAvailable();

    List<Device> findAll();
}
