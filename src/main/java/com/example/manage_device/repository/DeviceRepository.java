package com.example.manage_device.repository;

import com.example.manage_device.model.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {

//    @Query("SELECT * FROM device WHERE "
//            + "(:search is null or lower(s.device_name) LIKE CONCAT('%',lower(:search),'%') " //
//            + "OR lower(s.os) LIKE CONCAT('%',lower(:search),'%')) ")
    @Query(value = "SELECT * FROM device WHERE device_name LIKE %:term% OR os LIKE %:term%" , nativeQuery = true)
    public Page<Device> searchByKeyword(@Param("term") String term,
                                         Pageable paging);

    @Query(value = "SELECT COUNT(id) FROM device WHERE status LIKE %:term% ", nativeQuery = true)
    Long getTotalDeviceAvailable(@Param("term") String term);
}
