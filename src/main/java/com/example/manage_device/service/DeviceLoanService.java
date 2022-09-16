package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import com.example.manage_device.model.DeviceLoan;
import com.example.manage_device.model.dto.DeviceLoanDto;
import com.example.manage_device.model.request.DeviceLoanRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface DeviceLoanService {


    List<DeviceLoan> getAllDeviceLoan();


    DeviceLoan save(DeviceLoanRequest deviceLoanRequest);

    Optional<DeviceLoan> getDeviceLoanByID(Long id);
    void delete(Long id);
    Optional<DeviceLoan> findById(Long id);

    DeviceLoan save(DeviceLoan deviceLoan);

    Page<?> searchByKeyword(String term, Pageable paging);

    DeviceLoan update(Long id, DeviceLoanRequest deviceLoan);
}
