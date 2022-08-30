package com.example.manage_device.repository;

import com.example.manage_device.model.DeviceLoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceLoanRepository extends JpaRepository<DeviceLoan, Long> {
}
