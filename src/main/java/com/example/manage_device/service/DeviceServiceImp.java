package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import com.example.manage_device.repository.DeviceRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class DeviceServiceImp implements DeviceService {

    private final static String AVAILABLE = "Available";
    @Value("${qr.code.directory}")
    private String qrCodeDirectory;
    private Logger logger = LoggerFactory.getLogger(DeviceServiceImp.class);

    @Autowired
    DeviceRepository deviceRepository;
    @Override
    public List<Device> getAllDevice() {
        return deviceRepository.findAll();
    }

    @Override
    public Optional<Device> getDeviceByID(Long id) {
        return deviceRepository.findById(id);
    }

    @Override
    public Device createDevice() {
        return deviceRepository.save(new Device());
    }

    @Override
    public void delete(Long id) {
        deviceRepository.deleteById(id);
    }

//    @Override
//    public Optional<Device> updateDevice(Long id) {
//        return deviceRepository.findById(id);
//    }



    @Override
    public Device save(Device device) {
        String path_qr = generateQRCode("Duong link den dang ky muon thiet bi", qrCodeDirectory+ new Timestamp(System.currentTimeMillis()).getTime() +".png", 400, 400);
        path_qr = path_qr.replace("FE_Manage_Device", "..");
        path_qr = path_qr.replace("src", "..");
        device.setPath_QR(path_qr);
        device.setCreate_at(new Timestamp(System.currentTimeMillis()));
        device.setStatus(AVAILABLE);
        return deviceRepository.save(device);

    }
    @Override
    public Optional<Device> findById(Long id) {
        return deviceRepository.findById(id);
    }


    public String generateQRCode(String qrCodeContent, String filePath, int width, int height) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(qrCodeContent, BarcodeFormat.QR_CODE, width, height);
            Path path = Paths.get(filePath);
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
            return filePath;
        } catch (WriterException e) {
            logger.error("Error", e);
        } catch (IOException e) {
            logger.error("Error", e);
        }
        return "Error create QR code";
    }

}
