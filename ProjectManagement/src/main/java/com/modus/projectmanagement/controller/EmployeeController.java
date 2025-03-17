package com.modus.projectmanagement.controller;

import com.modus.projectmanagement.payload.EmployeeDto;
import com.modus.projectmanagement.payload.EmployeeSuccessResponse;
import com.modus.projectmanagement.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000/","http://localhost:3001/"})
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/createEmployee")
    public ResponseEntity<EmployeeSuccessResponse> crateEmployee(@RequestBody @Valid EmployeeDto employeeDto){
        EmployeeSuccessResponse response = employeeService.createEmployee(employeeDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/getAllEmployee")
    public ResponseEntity<List<EmployeeDto>> getAllEmployee() {
        List<EmployeeDto> listOfEmployees = employeeService.getAllEmployee();
        return ResponseEntity.status(HttpStatus.OK).body(listOfEmployees);
    }
    @GetMapping("/getEmployee/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id){
        EmployeeDto employee = employeeService.getEmployeeById(id);
        return ResponseEntity.status(HttpStatus.OK).body(employee);
    }

    @PutMapping("/updateEmployee")
    public ResponseEntity<EmployeeSuccessResponse> updateEmployee(@RequestBody @Valid EmployeeDto employeeDto){
        EmployeeSuccessResponse response = employeeService.updateEmployee(employeeDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/deleteEmployees")
    public ResponseEntity<EmployeeSuccessResponse> deleteEmployees(@RequestBody List<Long> ids){
        EmployeeSuccessResponse response = employeeService.deleteEmployees(ids);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
