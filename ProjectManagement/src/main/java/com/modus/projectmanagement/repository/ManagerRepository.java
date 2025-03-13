package com.modus.projectmanagement.repository;
import com.modus.projectmanagement.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager,Long> {
}
