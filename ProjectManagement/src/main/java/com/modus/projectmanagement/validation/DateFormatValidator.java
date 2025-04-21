package com.modus.projectmanagement.validation;

import com.modus.projectmanagement.exception.InvalidDateFormatException;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class DateFormatValidator implements ConstraintValidator<ValidDateFormat, LocalDate> {
    private static final String DD_MM_YY_PATTERN = "^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\\d{2})$";
    private static final String YY_MM_DD_PATTERN = "^(\\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$";
    private static final String YYYY_MM_DD_PATTERN = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$";
    private static final String DD_MM_YY_SLASH_PATTERN = "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(\\d{2})$";
    private static final String YY_MM_DD_SLASH_PATTERN = "^(\\d{2})/(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])$";
    private static final String YYYY_MM_DD_SLASH_PATTERN = "^\\d{4}/(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])$";
    private static final String DD_MM_YY_DOT_PATTERN = "^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.(\\d{2})$";
    private static final String YY_MM_DD_DOT_PATTERN = "^(\\d{2})\\.(0[1-9]|1[0-2])\\.(0[1-9]|[12][0-9]|3[01])$";
    private static final String YYYY_MM_DD_DOT_PATTERN = "^\\d{4}\\.(0[1-9]|1[0-2])\\.(0[1-9]|[12][0-9]|3[01])$";
    private static final String DD_MM_YYYY="^\\d{2}-\\d{2}-\\d{4}$\n";
    private static final String DD_MONTH_NAME_YYYY= "^\\d{2}-[A-Za-z]{3}-\\d{4}$";
    @Override
    public boolean isValid(LocalDate date, ConstraintValidatorContext context) {
        String value=date.toString();
        if (value == null || value.isEmpty()) {
            return true;
        }
        if(!( value.matches(DD_MONTH_NAME_YYYY) ||
                value.matches(DD_MM_YYYY) ||
                value.matches(DD_MM_YY_PATTERN) ||
                value.matches(YY_MM_DD_PATTERN) ||
                value.matches(YYYY_MM_DD_PATTERN) ||
                value.matches(DD_MM_YY_SLASH_PATTERN) ||
                value.matches(YY_MM_DD_SLASH_PATTERN) ||
                value.matches(YYYY_MM_DD_SLASH_PATTERN) ||
                value.matches(DD_MM_YY_DOT_PATTERN) ||
                value.matches(YY_MM_DD_DOT_PATTERN) ||
                value.matches(YYYY_MM_DD_DOT_PATTERN))){
            throw new InvalidDateFormatException("Invalid date format Exception: "+value);
        }
        return true;
    }
}
