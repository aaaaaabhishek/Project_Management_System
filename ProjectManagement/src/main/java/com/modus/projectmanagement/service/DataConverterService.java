package com.modus.projectmanagement.service;

import com.modus.projectmanagement.payload.EmployeeBYCSVORXSLXDto;
import com.modus.projectmanagement.payload.EmployeeDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public interface DataConverterService {
    public List<EmployeeBYCSVORXSLXDto> uploadMultipart(List<EmployeeBYCSVORXSLXDto>  employeeBYCSVORXSLXDtos) throws IOException;
    public List<EmployeeBYCSVORXSLXDto> uploadMultipartXlSX(List<EmployeeBYCSVORXSLXDto> employeeBYCSVORXSLXDtos) throws Exception;
}
