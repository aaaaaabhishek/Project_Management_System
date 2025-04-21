package com.modus.projectmanagement.controller;
import com.modus.projectmanagement.Utils.CsvUtils;
import com.modus.projectmanagement.Utils.ExcelUtils;
import com.modus.projectmanagement.payload.EmployeeBYCSVORXSLXDto;
import com.modus.projectmanagement.service.DataConverterService;
import com.modus.projectmanagement.validation.Validator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/file")
public class DataConverterController {
    public final DataConverterService dataConverterService;
    private final ExcelUtils excelUtils;
    private final Validator validator;
    public DataConverterController(DataConverterService dataConverterService, ExcelUtils excelUtils, Validator validator) {
        this.dataConverterService = dataConverterService;
        this.excelUtils = excelUtils;
        this.validator = validator;
    }
    @PostMapping("/upload")
    public ResponseEntity<Object> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String filename = file.getOriginalFilename();
        if (filename == null) {
            return ResponseEntity.badRequest().body("Invalid file.");
        }
        try (InputStream inputStream = file.getInputStream()) {
            if (filename.endsWith(".csv")) {
                List< EmployeeBYCSVORXSLXDto> employeeDto= CsvUtils.read(EmployeeBYCSVORXSLXDto.class, file.getInputStream());
                List<String> validationErrors = validator.validateEmployeeList(employeeDto);
                if (!validationErrors.isEmpty()) {
                    return ResponseEntity.badRequest().body(validationErrors);
                }
                List<EmployeeBYCSVORXSLXDto> employeeDtos = dataConverterService.uploadMultipart(employeeDto);
                return ResponseEntity.ok("CSV processed: " + employeeDtos.size() + " records.");
            } else if (filename.endsWith(".xlsx")) {
                List<EmployeeBYCSVORXSLXDto> employeeBYCSVORXSLXDtos= excelUtils.readExcel(inputStream);
                List<String> validationErrors = validator.validateEmployeeList(employeeBYCSVORXSLXDtos);
                if (!validationErrors.isEmpty()) {
                    return ResponseEntity.badRequest().body(validationErrors);
                }
                List<EmployeeBYCSVORXSLXDto> employeeDtos = dataConverterService.uploadMultipartXlSX(employeeBYCSVORXSLXDtos);
                return ResponseEntity.ok("XLSX processed: " + employeeDtos.size() + " records.");
            } else {
                return ResponseEntity.badRequest().body("Unsupported file type.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("message","Failed to process file: "+ e.getMessage()));
        }

    }
}
