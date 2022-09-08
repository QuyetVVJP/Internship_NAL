package com.example.manage_device.controller;

import com.example.manage_device.exception.ResourceNotFoundException;
import com.example.manage_device.model.Device;
import com.example.manage_device.model.DeviceLoan;
import com.example.manage_device.model.dto.DeviceLoanDto;
import com.example.manage_device.model.request.DeviceLoanRequest;
import com.example.manage_device.service.DeviceLoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.example.manage_device.utils.ParamKey.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/loan")
public class DeviceLoanController {

    @Autowired
    private DeviceLoanService deviceLoanService;

    public DeviceLoanController(DeviceLoanService deviceLoanService) {
        this.deviceLoanService = deviceLoanService;
    }

    @GetMapping("/list")
    public List<DeviceLoanDto> getAllDeviceLoan() {
        List<DeviceLoan> deviceLoans = deviceLoanService.getAllDeviceLoan();
        List<DeviceLoanDto> deviceLoanDtos = new ArrayList<>();
        for (DeviceLoan deviceLoan: deviceLoans
             ) {
            DeviceLoanDto loanDto = new DeviceLoanDto();
            loanDto.setDeviceName(deviceLoan.getDevice().getDevice_name());
            loanDto.setUsername(deviceLoan.getUser().getFirst_name() + " " + deviceLoan.getUser().getLast_name());
            loanDto.setEmail(deviceLoan.getUser().getEmail());

            loanDto.setBorrow_date(deviceLoan.getBorrow_date());
            loanDto.setReturn_date(deviceLoan.getReturn_date());
            loanDto.setStatus(deviceLoan.getStatus());
            loanDto.setReason(deviceLoan.getReason());

            deviceLoanDtos.add(loanDto);
        }
        return deviceLoanDtos;
    }
    @GetMapping("/search")
    public Page<DeviceLoan> search(
            @RequestParam(name = PAGE, required = true, defaultValue = "0") int page,
            @RequestParam(name = PAGE_SIZE, required = true, defaultValue = Integer.MAX_VALUE + "") int size,
            @RequestParam(name = TERM, required = true, defaultValue = "") String term
    ){
        Pageable paging = null;
        paging = PageRequest.of(page, size);

        if (term != null)
            term = term.trim();

        Page<DeviceLoan> resdto = deviceLoanService.searchByKeyword(term, paging);
        return resdto;
    }

    @PostMapping("/create")
    public DeviceLoan createDevice(@RequestBody DeviceLoanRequest deviceLoanRequest) {
        DeviceLoan deviceLoan = deviceLoanService.save(deviceLoanRequest);
        return deviceLoan;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<DeviceLoan>> getDeviceLoanById(@PathVariable Long id){
        Optional<DeviceLoan> result = deviceLoanService.getDeviceLoanByID(id);
        return  ResponseEntity.ok(result);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DeviceLoan> updateDeviceLoan(@PathVariable Long id,@RequestBody DeviceLoanRequest deviceLoanRequest) throws Throwable {

        DeviceLoan deviceLoan = deviceLoanService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Yeu cau muon khong ton tai:" + id));
        DeviceLoan updatedDeviceLoan = deviceLoanService.update(id,deviceLoanRequest);
        return ResponseEntity.ok(updatedDeviceLoan);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteDeviceLoan(@PathVariable Long id) throws Throwable {
        DeviceLoan deviceLoan = deviceLoanService.findById(id)
                .orElseThrow( () -> new ResourceNotFoundException("Yeu cau muon khong ton tai:" + id));
        deviceLoanService.delete(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
