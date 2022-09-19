package com.example.manage_device.repository;

import com.example.manage_device.model.Device;
import com.example.manage_device.model.DeviceLoan;
import com.example.manage_device.model.User;
import com.example.manage_device.model.dto.DeviceLoanDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeviceLoanRepository extends JpaRepository<DeviceLoan, Long> {
    @Query(value = "SELECT device_loan.id, user.first_name, user.last_name,user.email, device.device_name,device_loan.borrow_date, device_loan.return_date,device_loan.status, device_loan.reason" +
            "  FROM device_loan" +
            "  INNER JOIN user" +
            "  ON device_loan.user_id = user.id" +
            "  INNER JOIN device" +
            "  ON device_loan.device_id = device.id WHERE (first_name LIKE %:term% OR email LIKE %:term% OR last_name LIKE %:term% OR device_name LIKE %:term%) AND device_loan.deleted !=true " , nativeQuery = true)
    public Page<?> searchByKeyword(@Param("term") String term,
                                               Pageable paging);

    @Query(value = "SELECT * FROM device_loan WHERE id = :id", nativeQuery = true)
    Optional<DeviceLoan> findDeviceByDeviceID(@Param("id")Long id);
}
