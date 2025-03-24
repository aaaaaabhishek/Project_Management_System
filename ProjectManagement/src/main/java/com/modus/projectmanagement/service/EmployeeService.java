package com.modus.projectmanagement.service;


import com.modus.projectmanagement.payload.EmployeeDto;
import com.modus.projectmanagement.payload.EmployeeSuccessResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EmployeeService {

    EmployeeSuccessResponse createEmployee(EmployeeDto employeeDto);

//    List<EmployeeDto> getAllEmployee();

    public Page<EmployeeDto> getAllEmployee(Pageable pageable);

    EmployeeDto getEmployeeById(Long id);

    EmployeeSuccessResponse updateEmployee(EmployeeDto employeeDto);

    EmployeeSuccessResponse deleteEmployees(List<Long> ids);
}
