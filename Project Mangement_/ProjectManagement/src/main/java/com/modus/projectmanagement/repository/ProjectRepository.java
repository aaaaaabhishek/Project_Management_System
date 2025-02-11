package com.modus.projectmanagement.repository;

import com.modus.projectmanagement.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,String> {

}
