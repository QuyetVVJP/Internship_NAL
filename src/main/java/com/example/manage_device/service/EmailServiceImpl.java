package com.example.manage_device.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail,
                            String Text,
                            String Subject
    ) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("teamcnaljapan@gmail.com");
        message.setTo(toEmail);
        message.setText(Text);
        message.setSubject(Subject);

        mailSender.send(message);

    }


}

