package com.modus.projectmanagement.payload;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.modus.projectmanagement.validation.ValidDateFormat;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDate;

@Data
public class EmployeeBYCSVORXSLXDto {

    private Long empId;


    private String empName;


    private String phone;


    private String email;


    private String designation;


    private String salary;


    private String location;
@ValidDateFormat
    private LocalDate joiningDate;
}
