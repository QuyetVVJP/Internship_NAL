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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.example.manage_device.utils.ParamKey.AVAILABLE;

@Component
public class DeviceServiceImp implements DeviceService {

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
    public void delete(Long id) { deviceRepository.deleteById(id); }

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
        if(device.getStatus() == null){
            device.setStatus(AVAILABLE);
        }
        return deviceRepository.save(device);

    }
    @Override
    public Optional<Device> findById(Long id) {
        return deviceRepository.findById(id);
    }

    @Override
    public Page<Device> searchByKeyword(String term, Pageable paging) {
        Page<Device> res = deviceRepository.searchByKeyword(term, paging);
        return res;
    }

    @Override
    public Long getTotal() {
        return deviceRepository.findAll().stream().count();
    }

    @Override
    public Long getTotalDeviceAvailable() {

        return deviceRepository.getTotalDeviceAvailable("Còn trong kho");
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
