package com.modus.projectmanagement.service.Iservice;
import com.modus.projectmanagement.entity.Manager;
import com.modus.projectmanagement.entity.Project;
import com.modus.projectmanagement.exception.ManagerNotFoundException;
import com.modus.projectmanagement.exception.ProjectCreationException;
import com.modus.projectmanagement.payload.ProjectDto;
import com.modus.projectmanagement.repository.ManagerRepository;
import com.modus.projectmanagement.repository.ProjectRepository;
import com.modus.projectmanagement.service.ProjectService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
@Service
public class IProjectService implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ModelMapper mapper;
    private static final Logger logger = LoggerFactory.getLogger(ProjectService.class);
    private final ManagerRepository managerRepository;
    public IProjectService(ProjectRepository projectRepository, ModelMapper mapper, ManagerRepository managerRepository) {
        this.mapper = mapper;
        this.projectRepository = projectRepository;
        this.managerRepository = managerRepository;
    }
    @Override
    @Transactional
    public ProjectDto createProject(ProjectDto projectDto) {
        Manager manager = managerRepository.findById(Long.parseLong(projectDto.getManagerId()))
                .orElseThrow(() -> new ManagerNotFoundException("Manager not found"));


        String projectID = UUID.randomUUID().toString();
        Project project = convertToEntity(projectDto);
        project.setProjectID(projectID);


        logger.info("Creating new Project with ID: {}, Details: {}", projectID, projectDto);

        Project savedProject = projectRepository.save(project);
        if (savedProject == null) {
            logger.error("Failed to save project with ID: {}", projectID);
            throw new ProjectCreationException("Failed to save project with ID:" + projectID);
        }
            logger.info("Successfully saved Project with ID: {}", savedProject.getProjectID());

        return convertToDto(savedProject);
    }
    @Override
    @Transactional
    public Page<ProjectDto> getAllProject(int page,int limit) {
        logger.info("Fetching all projects from the database.");

        Page<Project> projectList = projectRepository.findAll(PageRequest.of(page,limit));

        logger.info("Retrieved {} projects.", projectList.getNumberOfElements());

        Page<ProjectDto> projectDtoPage = projectList.map(this::convertToDto);
        return projectDtoPage;
    }
    @Override
    @Transactional
    public ProjectDto updateProject(ProjectDto projectDto) {
     projectRepository.findById(projectDto.getProjectID()).orElseThrow(
                ()->new RuntimeException("ProjectId ="+projectDto.getProjectID()+" is not present")
        );
      Project project=convertToEntity(projectDto);
       Project saveProject=projectRepository.save(project);
       ProjectDto responseprojectDto=convertToDto(saveProject);
       return responseprojectDto;
    }
    @Override
    @Transactional
    public void deleteProjectById(List<String> projectId) {
        for(String proj_Id:projectId){
            projectRepository.findById(proj_Id).orElseThrow(()->new RuntimeException("ProjectId is not found"));
            logger.info("Project is found with  this projectID: {}",projectId);
            projectRepository.deleteById(proj_Id);
            logger.info("Project is deleted  with  this projectID :{}",projectId);
        }
    }

    private ProjectDto convertToDto(Project project) {
        logger.debug("Mapping Project entity to ProjectDto: {}", project);
        return mapper.map(project, ProjectDto.class);
    }
    private Project convertToEntity(ProjectDto projectDto) {
        logger.debug("Mapping ProjectDto to Project entity:{}", projectDto);
        return mapper.map(projectDto, Project.class);
    }
}