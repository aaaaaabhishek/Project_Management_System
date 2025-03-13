package com.modus.projectmanagement.service.Iservice;
import com.modus.projectmanagement.entity.Manager;
import com.modus.projectmanagement.payload.ManagerDto;
import com.modus.projectmanagement.repository.ManagerRepository;
import com.modus.projectmanagement.service.ManagerService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ImanagerService implements ManagerService {
    private final ManagerRepository managerRepository;
    private final ModelMapper mapper;
    public ImanagerService(ManagerRepository managerRepository, ModelMapper mapper) {
        this.managerRepository = managerRepository;
        this.mapper = mapper;
    }
    @Override
    @Transactional
    public ManagerDto addManager(ManagerDto managerDto) {
        Manager manager=mapper.map(managerDto,Manager.class);
        Manager savedManager=managerRepository.save(manager);
        return mapper.map(savedManager,ManagerDto.class);
    }
}
