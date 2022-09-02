package com.example.manage_device.controller;

import com.example.manage_device.exception.ResourceNotFoundException;
import com.example.manage_device.model.Avatar;
import com.example.manage_device.model.User;
import com.example.manage_device.service.EmailServiceImpl;
import com.example.manage_device.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {
    private static String UPLOAD_DIR = System.getProperty("user.dir") + "/FE_Manage_Device/src/assets/avatar/";

    @Autowired
    private UserService userService;
    @Autowired
    private EmailServiceImpl emailService;

    @GetMapping("/list")
    public List<User> getAllUser() {
        List<User> userList = userService.getAllUser();

        return userList;
    }
    @GetMapping("/email")
    public String emailService() {
        emailService.sendEmail("doducluong14@gmail.com",
                "Bạn đã đăng kí thành công",
                "Mượn thiết bị <Nal>");
        return  ("Đã gửi mail thành công!");
    }

    @PostMapping("/create")
    public User createUser(@RequestBody User user){
        return userService.save(user);
    }

    @PostMapping("/upload/image")
    public ResponseEntity<?> uploadAvatar(@RequestParam("image") MultipartFile file){

        // Create folder to save file if not exist
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
        MultipartFile fileData = file;
        String name = fileData.getOriginalFilename();
        if (name != null && name.length() > 0) {
            try {
                // Create file
                File serverFile = new File(UPLOAD_DIR  + name);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(fileData.getBytes());
                stream.close();
                return ResponseEntity.ok("Success");

            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when uploading");
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad request");
    }



    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id){
        Optional<User> result = userService.getUserByID(id);
        return  ResponseEntity.ok(result);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails, @ModelAttribute("avatar") Avatar avatar){
        User user = userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User khong ton tai"));

        user.setFirst_name(userDetails.getFirst_name());
        user.setLast_name(userDetails.getLast_name());
        user.setGender(userDetails.getGender());
        user.setEmployee_id(userDetails.getEmployee_id());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());
        user.setDepartment(userDetails.getDepartment());
//        user.setRole_id(userDetails.getRole_id());

        String path = System.getProperty("{id}");
        MultipartFile image = avatar.getFileData();
        String name = image.getOriginalFilename();
        if (name != null && name.length() > 0) {
            try {
                File serverFile = new File(path + "/" + name);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(image.getBytes());
                stream.close();
                user.setAvatar_url(serverFile.getPath());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error");
            }
        }

        User updatedUser = userService.save(user);
        return ResponseEntity.ok(updatedUser);
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id){
        User user = userService.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("User khong ton tai:" + id));
        userService.delete(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
