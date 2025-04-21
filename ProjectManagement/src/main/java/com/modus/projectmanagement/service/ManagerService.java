package com.modus.projectmanagement.service;
import com.modus.projectmanagement.payload.ManagerDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ManagerService {
    public ManagerDto addManager(ManagerDto managerDto);


    void deleteManagerById(List<String> managerIds);

    Page<ManagerDto> getAllManger(int page, int limit);

    ManagerDto getManagerById(long managerId);

    ManagerDto changeManagerDetails(ManagerDto managerDto);
}
