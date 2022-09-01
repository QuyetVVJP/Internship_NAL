package com.example.manage_device.repository;

import com.example.manage_device.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM user WHERE email LIKE %:email%" , nativeQuery = true)
    User findByEmail(String email);
}
