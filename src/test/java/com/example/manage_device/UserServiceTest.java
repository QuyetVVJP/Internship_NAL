package com.example.manage_device;

import com.example.manage_device.model.User;
import com.example.manage_device.repository.UserRepository;
import com.example.manage_device.service.UserService;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        List<User> users = new ArrayList<User>();
        User user = new User();
        user.setId(1);
        users.add(user);

        Mockito.when(userRepository.findAll()).thenReturn(users);
    }

    @Test
    public void testGetListUser() {
        assertEquals(1, userService.getAllUser().size());
    }


}
