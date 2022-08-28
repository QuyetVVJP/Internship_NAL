package com.example.manage_device.controller;

import com.example.manage_device.exception.ResourceNotFoundException;
import com.example.manage_device.model.User;
import com.example.manage_device.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/list")
    public List<User> getAllUser() {
        List<User> userList = userService.getAllUser();
        return userList;
    }

    @PostMapping("/create")
    public User createUser(@RequestBody User user){
        return userService.save(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id){
        Optional<User> result = userService.getUserByID(id);
        return  ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
        User user = userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User khong ton tai"));

        user.setFirst_name(userDetails.getFirst_name());
        user.setLast_name(userDetails.getLast_name());
        user.setGender(userDetails.getGender());
        user.setEmployee_id(userDetails.getEmployee_id());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());
        user.setDepartment(userDetails.getDepartment());
        user.setAvatar(userDetails.getAvatar());
        user.setRole_id(userDetails.getRole_id());

        User updatedUser = userService.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        User user = userService.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("User khong ton tai:" + id));
        userService.delete(id);
        return ResponseEntity.ok("User deleted");
    }
}
