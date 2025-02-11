package com.modus.employee_management.service.serviceimp;

import com.modus.employee_management.entity.Employee;
import com.modus.employee_management.payload.EmployeeDto;
import com.modus.employee_management.repository.EmployeeRepository;
import com.modus.employee_management.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImp implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public EmployeeServiceImp(EmployeeRepository employeeRepository, ModelMapper modelMapper){
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = convertToEntity(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return convertToDto(savedEmployee);
    }
    private Employee convertToEntity(EmployeeDto employeeDto){

        return modelMapper.map(employeeDto,Employee.class);
    }
    private EmployeeDto convertToDto(Employee employee){

        return modelMapper.map(employee, EmployeeDto.class);
    }
}