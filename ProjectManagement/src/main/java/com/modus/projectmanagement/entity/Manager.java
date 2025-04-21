package com.modus.projectmanagement.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Manager {
    @Id
    public Long managerId;
    public String managerName;
  @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> projects = new ArrayList<>();
    public void addProject(Project project) {
        projects.add(project);
        project.setManager(this);
    }
}
