package com.example.manage_device.repository;

import com.example.manage_device.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM user WHERE email LIKE %:email%" , nativeQuery = true)
    User findByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET is_login = false WHERE id != 0" , nativeQuery = true)
    void resetLogin();

    @Modifying
    @Transactional
    @Query(value = "update user u set u.is_login = true WHERE u.id = :id" , nativeQuery = true)
    void setIsLogin(@Param("id")Long id);

    @Query(value = "SELECT * FROM user WHERE is_login = 1" , nativeQuery = true)
    User findUserLogin();


    @Query(value = "SELECT * FROM user WHERE first_name LIKE %:term% OR last_name LIKE %:term% OR email LIKE %:term% OR employee_id LIKE %:term% OR phone LIKE %:term% ORDER BY id DESC" , nativeQuery = true)
    public Page<User> searchByKeyword(@Param("term") String term, Pageable paging);

    @Query(value = "SELECT * FROM user ORDER BY id DESC" , nativeQuery = true)
    List<User> findAll();
}
