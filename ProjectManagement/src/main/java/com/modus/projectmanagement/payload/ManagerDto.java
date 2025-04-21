package com.modus.projectmanagement.payload;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ManagerDto {
    @Column(unique = true)
    public Long managerId;
    public String managerName;
    public List<ProjectDto> projects;

}
