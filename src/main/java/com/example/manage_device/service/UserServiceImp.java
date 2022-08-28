package com.example.manage_device.service;

import com.example.manage_device.model.User;
import com.example.manage_device.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserServiceImp implements UserService {
    @Autowired
    UserRepository userRepository;
    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByID(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User createUser() {
        return userRepository.save(new User());
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);

    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);

    }

}