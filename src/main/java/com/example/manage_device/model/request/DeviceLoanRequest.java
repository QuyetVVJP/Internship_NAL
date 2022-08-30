package com.example.manage_device.model.request;

import com.example.manage_device.model.Device;
import com.example.manage_device.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeviceLoanRequest {

    private long user_id;

    private Timestamp borrow_date;

    private Timestamp return_date;

    private String status;
    private long device_id;

}
