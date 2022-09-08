package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import com.example.manage_device.model.Role;
import com.example.manage_device.model.User;
import com.example.manage_device.model.request.UserRequest;
import com.example.manage_device.repository.RoleRepository;
import com.example.manage_device.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Component
public class UserServiceImp implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByID(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findById(Long id) { return userRepository.findById(id); }

    @Override
    public User register(UserRequest userRequest) {
        User user = new User();
        user.setFirst_name(userRequest.getFirst_name());
        user.setLast_name(userRequest.getLast_name());
        user.setPassword(userRequest.getPassword());
        user.setEmail(userRequest.getEmail());
        Role role = roleRepository.findById(1L).get();
        user.setRole(role);
        user.setCreated_at(new Timestamp(System.currentTimeMillis()));
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {

        return userRepository.findByEmail(email);
    }

    @Override
    public void updateIsLogin(long id) {
        userRepository.setIsLogin(id);
    }

    @Override
    public void resetIsLogin() {
        userRepository.resetLogin();
    }

    @Override
    public User checkUserIsLogin() {
        User user = new User();
        user = userRepository.findUserLogin();
        return user;
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User save(User user) {
        user.setCreated_at(new Timestamp(System.currentTimeMillis()));
        return userRepository.save(user);

    }

    @Override
    public Page<User> searchByKeyword(String term, Pageable paging) {
        Page<User> res = userRepository.searchByKeyword(term, paging);
        return res;
    }

}