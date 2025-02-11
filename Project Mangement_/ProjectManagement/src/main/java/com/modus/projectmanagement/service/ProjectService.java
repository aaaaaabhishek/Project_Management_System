package com.modus.projectmanagement.service;
import com.modus.projectmanagement.payload.ProjectDto;
import java.util.List;
public interface ProjectService {
    public ProjectDto createProject(ProjectDto projectDto);
    List<ProjectDto> getAllProject();

}
