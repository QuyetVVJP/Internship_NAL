package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import com.example.manage_device.model.DeviceLoan;
import com.example.manage_device.model.User;
import com.example.manage_device.model.request.UserRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    List<User> getAllUser();

    Optional<User> getUserByID(Long id);

    void delete(Long id);

    User save(User user);

    Optional<User> findById(Long id);

    User register(UserRequest userRequest);

    User findByEmail(String email);

    @Transactional
    void updateIsLogin(long id);

    @Transactional
    void resetIsLogin();

    User checkUserIsLogin();
    Page<User> searchByKeyword(String term, Pageable paging);

    Page<?> getDeviceLoanByUser(Long user_id, Pageable paging);
}
