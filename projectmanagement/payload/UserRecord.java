package com.modus.projectmanagement.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRecord {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
}
