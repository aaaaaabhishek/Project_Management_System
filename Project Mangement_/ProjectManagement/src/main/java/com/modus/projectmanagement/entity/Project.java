package com.modus.projectmanagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Project")
public class Project {
    @Id
    private String projectID;
    private String projectName;
    private String startDate;
    private String endDate;
    private String projectType;
        @ManyToOne
        @JoinColumn(name = "manager_id")
        private Manager manager;
}
