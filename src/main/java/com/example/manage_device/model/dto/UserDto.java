package com.example.manage_device.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@NoArgsConstructor
@Getter
public class UserDto {

    private long id;
    private String first_name;
    private String last_name;
    private String email;
    private String name_role;
    private String avatar_url;
}
