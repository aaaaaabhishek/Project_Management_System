package com.modus.projectmanagement.validation;

import com.modus.projectmanagement.payload.EmployeeBYCSVORXSLXDto;
import jakarta.validation.ConstraintViolation;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class Validator {
    private final jakarta.validation.Validator validator;

    public Validator(jakarta.validation.Validator validator) {
        this.validator = validator;
    }

    public List<String> validateEmployeeList(List<EmployeeBYCSVORXSLXDto> employeeList) {
        List<String> errors = new ArrayList<>();

        for (int i = 0; i < employeeList.size(); i++) {
            EmployeeBYCSVORXSLXDto dto = employeeList.get(i);
             Set<ConstraintViolation<EmployeeBYCSVORXSLXDto>> violations = validator.validate(dto);

            for (ConstraintViolation<EmployeeBYCSVORXSLXDto> violation : violations) {
                errors.add("Row " + (i + 1) + ": " + violation.getMessage());
            }
        }
        return errors;
    }
}
