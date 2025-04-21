package com.modus.projectmanagement.service.Iservice;

import com.modus.projectmanagement.Utils.CsvUtils;
import com.modus.projectmanagement.Utils.ExcelUtils;
import com.modus.projectmanagement.entity.EmployeeBYCSVORXSLX;
import com.modus.projectmanagement.payload.EmployeeBYCSVORXSLXDto;
import com.modus.projectmanagement.repository.DataConvertRepository;
import com.modus.projectmanagement.service.DataConverterService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class IDataConverterService implements DataConverterService {
    private final DataConvertRepository dataConvertRepository;
private final ModelMapper mapper;
private final ExcelUtils excelUtils;
    public IDataConverterService(DataConvertRepository dataConvertRepository, ModelMapper mapper, ExcelUtils excelUtils) {
        this.dataConvertRepository = dataConvertRepository;
        this.mapper = mapper;
        this.excelUtils = excelUtils;
    }
    public List<EmployeeBYCSVORXSLXDto> uploadMultipart(List<EmployeeBYCSVORXSLXDto> employeeDto) throws IOException {
//       List< EmployeeBYCSVORXSLXDto> employeeDto= CsvUtils.read(EmployeeBYCSVORXSLXDto.class, file.getInputStream());
      List<EmployeeBYCSVORXSLX> employeeList= employeeDto.stream().map(this::convertToEntity).toList();
      List<EmployeeBYCSVORXSLX> employeeList1=dataConvertRepository.saveAll(employeeList);
      List<EmployeeBYCSVORXSLXDto> employeeDtoList=employeeList1.stream()
              .map(this::convertEntityToDto).toList();
      return employeeDtoList;
    }
    public List<EmployeeBYCSVORXSLXDto> uploadMultipartXlSX(List<EmployeeBYCSVORXSLXDto> employeeBYCSVORXSLXDtos) throws Exception {
//        List<EmployeeBYCSVORXSLXDto> employeeBYCSVORXSLXDtos= excelUtils.readExcel(inputStream);
        List<EmployeeBYCSVORXSLX> employeeList= employeeBYCSVORXSLXDtos.stream()
                .map(this::convertToEntity)
                .toList();
        List<EmployeeBYCSVORXSLX> employeeList1=dataConvertRepository.saveAll(employeeList);
        List<EmployeeBYCSVORXSLXDto> employeeDtoList=employeeList1.stream()
                .map(this::convertEntityToDto).toList();
        return employeeDtoList;
    }
    public EmployeeBYCSVORXSLX convertToEntity(EmployeeBYCSVORXSLXDto employeeBYCSVORXSLXDto){
        EmployeeBYCSVORXSLX employee=mapper.map(employeeBYCSVORXSLXDto,EmployeeBYCSVORXSLX.class);
        return employee;
    }
    public EmployeeBYCSVORXSLXDto convertEntityToDto(EmployeeBYCSVORXSLX employeeBYCSVORXSLX){
        EmployeeBYCSVORXSLXDto employeeBYCSVORXSLXDto=mapper.map(employeeBYCSVORXSLX,EmployeeBYCSVORXSLXDto.class);
        return employeeBYCSVORXSLXDto;
    }
}
