package com.modus.projectmanagement.repository;

import com.modus.projectmanagement.entity.EmployeeBYCSVORXSLX;
import org.springframework.data.jpa.repository.JpaRepository;
public interface DataConvertRepository extends JpaRepository<EmployeeBYCSVORXSLX,Long> {
}
