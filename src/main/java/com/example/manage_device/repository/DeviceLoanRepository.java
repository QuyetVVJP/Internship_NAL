package com.example.manage_device.repository;

import com.example.manage_device.model.Device;
import com.example.manage_device.model.DeviceLoan;
import com.example.manage_device.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceLoanRepository extends JpaRepository<DeviceLoan, Long> {
    @Query(value = "SELECT user.first_name, user.last_name, device.device_name, user.email , device_loan.status, device_loan.borrow_date, device_loan.return_date" +
            "  FROM device_loan" +
            "  INNER JOIN user" +
            "  ON device_loan.user_id = user.id" +
            "  INNER JOIN device" +
            "  ON device_loan.device_id = device.id  LIKE %:term%" , nativeQuery = true)
    public Page<DeviceLoan> searchByKeyword(@Param("term") String term,
                                        Pageable paging);

}
