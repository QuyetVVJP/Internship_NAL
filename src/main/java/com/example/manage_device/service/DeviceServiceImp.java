package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import com.example.manage_device.repository.DeviceRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Component
public class DeviceServiceImp implements DeviceService {
    private Logger logger = LoggerFactory.getLogger(DeviceServiceImp.class);
    @Autowired
    DeviceRepository deviceRepository;
    @Override
    public List<Device> getAllDevice() {
        return deviceRepository.findAll();
    }

    @Override
    public boolean generateQRCode(String qrCodeContent, String filePath, int width, int height) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(qrCodeContent, BarcodeFormat.QR_CODE, width, height);
            Path path = Paths.get(filePath);
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
            return true;
        } catch (WriterException e) {
            logger.error("Error", e);
        } catch (IOException e) {
            logger.error("Error", e);
        }
        return false;
    }
}
