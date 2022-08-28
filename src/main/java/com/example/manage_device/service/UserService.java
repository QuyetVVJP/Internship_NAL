package com.example.manage_device.service;

import com.example.manage_device.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    List<User> getAllUser();

    Optional<User> getUserByID(Long id);

    User createUser();

    void delete(Long id);

    User save(User user);

    Optional<User> findById(Long id);

}
