package com.modus.projectmanagement.service.Iservice;
import com.modus.projectmanagement.entity.Manager;
import com.modus.projectmanagement.entity.Project;
import com.modus.projectmanagement.exception.ProjectCreationException;
import com.modus.projectmanagement.payload.ProjectDto;
import com.modus.projectmanagement.repository.ManagerRepository;
import com.modus.projectmanagement.repository.ProjectRepository;
import com.modus.projectmanagement.service.ProjectService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
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
                .orElseThrow(() -> new RuntimeException("Manager not found"));


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

    public List<ProjectDto> getAllProject() {
        logger.info("Fetching all projects from the database.");

        List<Project> projectList = projectRepository.findAll();

        logger.info("Retrieved {} projects.", projectList.size());

        return projectList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ProjectDto convertToDto(Project project) {
        logger.debug("Mapping Project entity to ProjectDto: {}", project);
        return mapper.map(project, ProjectDto.class);
    }

    private Project convertToEntity(ProjectDto projectDto) {
        logger.debug("Mapping ProjectDto to Project entity: {}", projectDto);
        return mapper.map(projectDto, Project.class);
    }
}