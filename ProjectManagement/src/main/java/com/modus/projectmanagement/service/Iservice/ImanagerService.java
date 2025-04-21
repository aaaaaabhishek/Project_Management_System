package com.modus.projectmanagement.service.Iservice;
import com.modus.projectmanagement.entity.Manager;
import com.modus.projectmanagement.exception.ManagerExistException;
import com.modus.projectmanagement.exception.ManagerNotFoundException;
import com.modus.projectmanagement.payload.ManagerDto;
import com.modus.projectmanagement.repository.ManagerRepository;
import com.modus.projectmanagement.service.ManagerService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Slf4j
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
        if(managerRepository.findById(managerDto.getManagerId()).isPresent()) {
            throw new ManagerExistException("Manager is already present with this manager_id: "+managerDto.getManagerId());
        }
        Manager manager=mapper.map(managerDto,Manager.class);
        Manager savedManager=managerRepository.save(manager);
        return mapper.map(savedManager,ManagerDto.class);
    }

    @Override
    public Page<ManagerDto> getAllManger(int page,int limit) {
        Page<Manager> managerlist=managerRepository.findAll(PageRequest.of(page,limit));

       Page<ManagerDto> projectDtoPage=managerlist.map(this::convertToDto);
       return projectDtoPage;
    }

    @Override
    public ManagerDto getManagerById(long managerId) {
       Manager manager= managerRepository.findById(managerId)
               .orElseThrow(()->new ManagerNotFoundException("Manager with this manager id not found:-"+managerId));
        ManagerDto managerDto=convertToDto(manager);
        return managerDto;
    }

    @Override
    public ManagerDto changeManagerDetails(ManagerDto managerDto) {
     managerRepository.findById(managerDto.managerId)
               .orElseThrow(()->new ManagerNotFoundException("Manager is not found with this managerId"));
    Manager manager= convertToEntity(managerDto);
      Manager updatedManager=managerRepository.save(manager);
      ManagerDto updatedManagerDto=convertToDto(updatedManager);
      return updatedManagerDto;
    }

    @Override
    public void deleteManagerById(List<String> managerIds) {
for(String managerId:managerIds){
    managerRepository.findById(Long.valueOf(managerId))
            .orElseThrow(()->new ManagerNotFoundException("Manager is not found with this MangerID:{}"+managerId));
    managerRepository.deleteById(Long.valueOf(managerId));
}
    }
    private ManagerDto convertToDto(Manager manager) {
        log.debug("Mapping Manager entity to ManagerDto: {}", manager);
        return mapper.map(manager, ManagerDto.class);
    }
    private Manager convertToEntity(ManagerDto managerDto) {
        log.debug("Mapping ManagerDto to Manager entity:{}", managerDto);
        return mapper.map(managerDto, Manager.class);
    }
}
