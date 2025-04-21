package com.modus.projectmanagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
public class EmployeeBYCSVORXSLX {
    @Id
    @Column(name = "emp_id", nullable = false)
    private Long empId;

    @Column(name = "emp_name", nullable = false)
    private String empName;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "designation", nullable = false)
    private String designation;

    @Column(name = "salary", nullable = false)
    private String salary;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "joining_date", nullable = false)
    private LocalDate joiningDate;
}
