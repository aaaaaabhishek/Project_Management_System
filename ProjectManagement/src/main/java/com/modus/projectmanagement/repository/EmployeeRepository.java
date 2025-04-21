package com.modus.projectmanagement.repository;

import com.modus.projectmanagement.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    Optional<Employee> findByPhone(String phone);

    @Query("SELECT e FROM Employee e WHERE e.phone = :phone AND e.empId <>:currentEmpId")
    Optional<Employee> findByPhoneExceptCurrentEmp(@Param("phone") String phone,@Param("currentEmpId") Long currentEmpId);
}
