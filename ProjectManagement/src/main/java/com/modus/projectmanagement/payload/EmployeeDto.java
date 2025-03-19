package com.modus.projectmanagement.payload;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    @NotNull(message = "{EMPLOYEE_ID_NULL}")
    private Long empId;

    @NotBlank(message = "{EMPLOYEE_NAME_REQUIRED}")
    @Size(min = 2, max = 50, message = "{EMPLOYEE_NAME_SIZE}")
    private String empName;

    @NotBlank(message = "{EMPLOYEE_PHONE_REQUIRED}")
    @Pattern(regexp = "\\d{10}", message = "{EMPLOYEE_PHONE_INVALID}")
    private String phone;

    @NotBlank(message = "{EMPLOYEE_EMAIL_REQUIRED}")
    @Email(message = "{EMPLOYEE_EMAIL_INVALID}")
    private String email;

    @NotBlank(message = "{EMPLOYEE_DESIGNATION_REQUIRED}")
    private String designation;

    @NotNull(message = "{EMPLOYEE_SALARY_REQUIRED}")
    private BigDecimal salary;

    @NotBlank(message = "{EMPLOYEE_LOCATION_REQUIRED}")
    private String location;

    @NotBlank(message = "{EMPLOYEE_JOINING_DATE_REQUIRED}")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "{EMPLOYEE_JOINING_DATE_INVALID}")
    private String joiningDate;
}
