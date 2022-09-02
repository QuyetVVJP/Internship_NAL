package com.example.manage_device.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private String rePassword;

}
