package com.example.manage_device.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "device_name")
    private String device_name;

    @Column(name = "information")
    private String information;

    @Column(name = "OS")
    private String OS;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "path_QR")
    private String path_QR;

    @Column(name = "create_at")
    private Timestamp create_at;

    @Column(name = "update_at")
    private Timestamp update_at;

    @Column(name = "status")
    private String status;
    
}



