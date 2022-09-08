package com.example.manage_device.repository;

import com.example.manage_device.model.Device;
import com.example.manage_device.model.DeviceLoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceLoanRepository extends JpaRepository<DeviceLoan, Long> {
    @Query(value = "SELECT * FROM device WHERE device_name LIKE %:term% OR os LIKE %:term%" , nativeQuery = true)
    public Page<DeviceLoan> searchByKeyword(@Param("term") String term,
                                        Pageable paging);
}
