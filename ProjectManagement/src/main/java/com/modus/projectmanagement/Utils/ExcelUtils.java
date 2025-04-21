package com.modus.projectmanagement.Utils;

import com.modus.projectmanagement.payload.EmployeeBYCSVORXSLXDto;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@Component
public class ExcelUtils {
    public  List<EmployeeBYCSVORXSLXDto> readExcel(InputStream inputStream) throws Exception {
        List<EmployeeBYCSVORXSLXDto> list = new ArrayList<>();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0);
        Iterator<Row> rows = sheet.iterator();
        // Read header row
        Map<Integer, String> headerMap = new HashMap<>();
        if (rows.hasNext()) {
            Row headerRow = rows.next();
            for (Cell cell : headerRow) {
                headerMap.put(cell.getColumnIndex(), cell.getStringCellValue().trim());
            }
        }
        // Process data rows
        while (rows.hasNext()) {
            Row row = rows.next();
            EmployeeBYCSVORXSLXDto obj = new EmployeeBYCSVORXSLXDto();
            for (Cell cell : row) {
                String fieldName = headerMap.get(cell.getColumnIndex());
                if (fieldName != null) {
                    setFieldValue(obj, fieldName, getCellValue(cell));
                }
            }
            list.add(obj);
        }
        workbook.close();
        return list;
    }

    private static String getCellValue(Cell cell) {
        if (cell == null) return "";
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> DateUtil.isCellDateFormatted(cell)
//                    ? cell.getDateCellValue().toString()
                    ? new SimpleDateFormat("yyyy-MM-dd").format(cell.getDateCellValue())

                    : String.valueOf((long) cell.getNumericCellValue());
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            default -> "";
        };
    }

    private static void setFieldValue(Object obj, String fieldName, String value) {
        try {
            Field field = obj.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            // Convert the value to the correct field type if necessary
            if (field.getType().equals(LocalDate.class)) {
                if (value != null && !value.isEmpty()) {
                    field.set(obj, LocalDate.parse(value)); // assuming yyyy-MM-dd
                }
            }
            else if(field.getType().equals(String.class)) {
                field.set(obj, value);
            } else if (field.getType().equals(Long.class) || field.getType().equals(long.class)) {
                field.set(obj, Long.parseLong(value));
            } else if (field.getType().equals(Integer.class) || field.getType().equals(int.class)) {
                field.set(obj, Integer.parseInt(value));
            } else if (field.getType().equals(Boolean.class) || field.getType().equals(boolean.class)) {
                field.set(obj, Boolean.parseBoolean(value));
            }
        } catch (NoSuchFieldException ignored) {
            // Field not found in class — ignore
        } catch (IllegalAccessException | NumberFormatException e) {
            e.printStackTrace();
        }
    }
}
