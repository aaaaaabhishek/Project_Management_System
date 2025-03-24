package com.modus.projectmanagement.service.Iservice;

import com.modus.projectmanagement.entity.Employee;
import com.modus.projectmanagement.exception.EmployeeExistsException;
import com.modus.projectmanagement.exception.EmployeeNotExistsException;
import com.modus.projectmanagement.payload.EmployeeDto;
import com.modus.projectmanagement.payload.EmployeeSuccessResponse;
import com.modus.projectmanagement.repository.EmployeeRepository;
import com.modus.projectmanagement.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImp implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;
    private final MessageSource messageSource;

    @Autowired
    public EmployeeServiceImp(EmployeeRepository employeeRepository, ModelMapper modelMapper, MessageSource messageSource) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
        this.messageSource = messageSource;
    }

    @Override
    public EmployeeSuccessResponse createEmployee(EmployeeDto employeeDto){
        //Validation for Employee ID available or not
        employeeRepository.findById(employeeDto.getEmpId())
                .ifPresent(emp -> {
                    throw new EmployeeExistsException(
                            messageSource.getMessage("EXCEPTION_EMPLOYEE_EXISTS", new Object[]{emp.getEmpId().toString()}, LocaleContextHolder.getLocale())
                    );
                });
        //Validation for mobile number should be unique
        if(employeeRepository.findByPhone(employeeDto.getPhone()).isPresent()){
            throw new EmployeeExistsException(
                    messageSource.getMessage("EXCEPTION_EMPLOYEE_EXISTS_PHONE",null, LocaleContextHolder.getLocale())
            );
        }

        Employee employee = convertToEntity(employeeDto);
        employeeRepository.save(employee);
        return new EmployeeSuccessResponse(HttpStatus.CREATED.value(),
                messageSource.getMessage("SUCCESS_EMPLOYEE_SAVE",null, LocaleContextHolder.getLocale())
        );
    }

//    @Override
//    public List<EmployeeDto> getAllEmployee() {
//        List<Employee> listOfEmployee = employeeRepository.findAll();
//        return listOfEmployee.stream().map(this::convertToDto).toList();
//    }
    @Override
    public Page<EmployeeDto> getAllEmployee(Pageable pageable) {
        return employeeRepository.findAll(pageable).map(this::convertToDto);
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        //Validation for Employee ID available or not, if available then return EmployeeDto
        Employee employee = employeeRepository.findById(id).orElseThrow(()->
                new EmployeeNotExistsException(
                        messageSource.getMessage("EXCEPTION_EMPLOYEE_NOT_EXISTS", new Object[]{id.toString()}, LocaleContextHolder.getLocale())
                ));
        return convertToDto(employee);
    }

    @Override
    public EmployeeSuccessResponse updateEmployee(EmployeeDto employeeDto) {
        //Validation to check employee exists with given ID, If not exists then getEmployeeById method throw Exception
        getEmployeeById(employeeDto.getEmpId());

        //Validation to check phone number does not exist with any other employee
        if(employeeRepository.findByPhoneExceptCurrentEmp(employeeDto.getPhone(), employeeDto.getEmpId()).isPresent()){
            throw new EmployeeExistsException(
                messageSource.getMessage("EXCEPTION_EMPLOYEE_EXISTS_PHONE",null, LocaleContextHolder.getLocale())
            );
        }

        Employee employee = convertToEntity(employeeDto);
        employeeRepository.save(employee);
        return new EmployeeSuccessResponse( HttpStatus.OK.value(),
                messageSource.getMessage("SUCCESS_EMPLOYEE_UPDATE", null, LocaleContextHolder.getLocale())
        );
    }

    @Override
    public EmployeeSuccessResponse deleteEmployees(List<Long> ids) {
        //Validation to check employee exists with given IDs, If not exists then getEmployeeById method throw Exception
        ids.forEach(this::getEmployeeById);

        employeeRepository.deleteAllById(ids);
        return new EmployeeSuccessResponse(HttpStatus.OK.value(),
                messageSource.getMessage("SUCCESS_EMPLOYEE_DELETE", null, LocaleContextHolder.getLocale())
        );
    }

    private Employee convertToEntity(EmployeeDto employeeDto) {

        return modelMapper.map(employeeDto, Employee.class);
    }

    private EmployeeDto convertToDto(Employee employee) {

        return modelMapper.map(employee, EmployeeDto.class);
    }
}