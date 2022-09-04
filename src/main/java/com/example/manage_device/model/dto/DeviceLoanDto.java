package com.example.manage_device.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DeviceLoanDto {
    private long id;
    private String username;
    private String email;
    private String deviceName;
    private Timestamp borrow_date;

    private Timestamp return_date;

    private String status;

    private String reason;
}
