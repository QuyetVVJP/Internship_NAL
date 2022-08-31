package com.example.manage_device.controller;

import com.example.manage_device.exception.ResourceNotFoundException;
import com.example.manage_device.model.Device;
import com.example.manage_device.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.example.manage_device.utils.ParamKey.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping("/list")
    public List<Device> getAllDevice() {
        List<Device> deviceList = deviceService.getAllDevice();
        return deviceList;
    }

    @GetMapping("/search")
    public Page<Device> search(
            @RequestParam(name = PAGE, required = true, defaultValue = "0") int page,
            @RequestParam(name = PAGE_SIZE, required = true, defaultValue = Integer.MAX_VALUE + "") int size,
            @RequestParam(name = TERM, required = true, defaultValue = "") String term
    ){
        Pageable paging = null;
        paging = PageRequest.of(page, size);

        if (term != null)
            term = term.trim();

        Page<Device> resdto = deviceService.searchByKeyword(term, paging);
        return resdto;
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getDeviceById(@PathVariable Long id) {
        Optional<Device> result = deviceService.getDeviceByID(id);
        return  ResponseEntity.ok(result);
    }
    @PostMapping("/create")
    public Device createDevice(@RequestBody Device device) {
        return deviceService.save(device);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long id,@RequestBody Device deviceDetails) throws Throwable {

        Device device = deviceService.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Device khong ton tai:" + id));
        device.setCreate_at(deviceDetails.getCreate_at());
        device.setDevice_name(deviceDetails.getDevice_name());
        device.setUpdate_at(deviceDetails.getUpdate_at());
        device.setOS(deviceDetails.getOS());
        device.setDevice_name(deviceDetails.getDevice_name());
        device.setInformation(deviceDetails.getInformation());
        device.setManufacturer(deviceDetails.getManufacturer());
        device.setStatus(deviceDetails.getStatus());
        device.setPath_QR(device.getPath_QR());
        device.setUpdate_at(new Timestamp(System.currentTimeMillis()));
        Device updateDevice = deviceService.save(device);
        return ResponseEntity.ok(updateDevice);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteDevice(@PathVariable Long id) throws Throwable {
        Device device = deviceService.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Device khong ton tai:" + id));
        deviceService.delete(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}