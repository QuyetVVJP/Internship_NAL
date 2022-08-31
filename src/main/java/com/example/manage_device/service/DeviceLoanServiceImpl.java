package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import com.example.manage_device.model.DeviceLoan;
import com.example.manage_device.model.User;
import com.example.manage_device.model.request.DeviceLoanRequest;
import com.example.manage_device.repository.DeviceLoanRepository;
import com.example.manage_device.repository.DeviceRepository;
import com.example.manage_device.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Component
public class DeviceLoanServiceImpl implements DeviceLoanService{
    private final static String WAITING = "Cho phe duyet";
    @Autowired
    private DeviceLoanRepository deviceLoanRepository;
    @Autowired
    private DeviceRepository deviceRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public List<DeviceLoan> getAllDeviceLoan() {
        return deviceLoanRepository.findAll();
    }

    @Override
    public Optional<DeviceLoan> getDeviceLoanByID(Long id) {
        return deviceLoanRepository.findById(id);
    }

    @Override
    public void delete(Long id) { deviceLoanRepository.deleteById(id); }

    @Override
    public Optional<DeviceLoan> findById(Long id) {
        return deviceLoanRepository.findById(id);
    }

    public DeviceLoan save(DeviceLoan deviceLoan) { return deviceLoanRepository.save(deviceLoan); }

    @Override
    public DeviceLoan save(DeviceLoanRequest deviceLoanRequest) {
        // TODO: Kiem tra user co ton tai hay khong
        User user = userRepository.findById(deviceLoanRequest.getUser_id()).get();
        // TODO: Kiem tra device co ton tai hay khong
        Device device = deviceRepository.findById(deviceLoanRequest.getDevice_id()).get();
        DeviceLoan deviceLoan = new DeviceLoan();
        deviceLoan.setUser(user);
        deviceLoan.setDevice(device);
        deviceLoan.setStatus(WAITING);
        deviceLoan.setReason(deviceLoanRequest.getReason());
        deviceLoan.setReturn_date(new Timestamp(System.currentTimeMillis()));
        deviceLoanRequest.setReturn_date(new Timestamp(System.currentTimeMillis()));
        return deviceLoanRepository.save(deviceLoan);
    }
}
