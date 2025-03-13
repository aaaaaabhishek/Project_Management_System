package com.modus.projectmanagement.service;
import com.modus.projectmanagement.payload.ProjectDto;
import org.springframework.data.domain.Page;

import java.util.List;
public interface ProjectService {
    public ProjectDto createProject(ProjectDto projectDto);
    Page<ProjectDto> getAllProject(int page, int limit);

    public ProjectDto updateProject(ProjectDto projectDto);

    void deleteProjectById(List<String> projectId);
}
