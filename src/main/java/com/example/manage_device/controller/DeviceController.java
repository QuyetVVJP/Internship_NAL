package com.example.manage_device.controller;

import com.example.manage_device.exception.ResourceNotFoundException;
import com.example.manage_device.model.Device;
import com.example.manage_device.model.DeviceLoan;
import com.example.manage_device.model.dto.DeviceChartDto;
import com.example.manage_device.service.DeviceLoanService;
import com.example.manage_device.service.DeviceService;

import com.example.manage_device.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.example.manage_device.utils.ParamKey.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;
    @Autowired
    private DeviceLoanService deviceLoanService;
    @Autowired
    private ExcelService excelService;
    @GetMapping("/list")
    public List<Device> getAllDevice() {
        List<Device> deviceList = deviceService.getAllDevice();
        return deviceList;
    }

    @GetMapping("/total")
    public DeviceChartDto getTotalDevice() {
        DeviceChartDto chartDto = new DeviceChartDto();
        Long total = deviceService.getTotal();
        Long totalDeviceAvailable = deviceService.getTotalDeviceAvailable();
        chartDto.setTotal(total);
        chartDto.setDevice_available(totalDeviceAvailable);
        chartDto.setDevice_unAvailable(total - totalDeviceAvailable);
        return chartDto;
    }

    @GetMapping("/exportExcel")
    public InputStreamResource exportExcel(){
        InputStreamResource inputStreamResource = null;
        ByteArrayInputStream byteArrayInputStream;
        try {
            List<Device> list = deviceService.findAll();
            byteArrayInputStream = excelService.writeExcel(list);
            inputStreamResource = new InputStreamResource(byteArrayInputStream);
        }catch (Exception ex) {
            throw ex;
        }
        return inputStreamResource;
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

    @GetMapping("/return-device/{id}")
    public ResponseEntity<Device> returnDevice(@PathVariable Long id){
        Device device = deviceService.getDeviceByID(id).get();
        device.setStatus(AVAILABLE);
        DeviceLoan deviceLoan = deviceLoanService.getDeviceLoanByID(device.getId()).get();
        deviceLoan.setDeleted(true);
        deviceLoanService.delete(deviceLoan.getId());
        deviceService.save(device);

        return ResponseEntity.ok(device);
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