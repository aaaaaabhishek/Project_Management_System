package com.modus.employee_management.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {

    @NotNull(message = "Employee ID cannot be null")
    private Long empId;

    @NotBlank(message = "Employee name is required")
    @Size(min = 2, max = 50, message = "Employee name must be between 2 and 50 characters")
    private String empName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Designation is required")
    private String designation;

    @NotNull(message = "Salary is required")
    private BigDecimal salary;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Joining date is required")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "Joining date must be in the format YYYY-MM-DD")
    private String joiningDate;
}
