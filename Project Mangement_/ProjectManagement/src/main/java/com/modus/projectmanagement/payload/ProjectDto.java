package com.modus.projectmanagement.payload;

import com.modus.projectmanagement.validation.ValidDateFormat;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDto {
    private String projectID;
    @NotNull(message = "ProjectName can't be null")
    private String projectName;
    @NotNull(message = "Start date can't be null")
    @ValidDateFormat
    private String startDate;
    @ValidDateFormat
    @NotNull(message = "End date can't be null")
    private String endDate;
    @NotNull(message = "ProjectType  can't be null")
    private String projectType;
    @NotNull(message = "Please provide the manager Id")
    private String managerId;
}