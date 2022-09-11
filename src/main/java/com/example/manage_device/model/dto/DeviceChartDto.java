package com.example.manage_device.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeviceChartDto {

    private long total;
    private long device_available;
    private long device_unAvailable;

}
