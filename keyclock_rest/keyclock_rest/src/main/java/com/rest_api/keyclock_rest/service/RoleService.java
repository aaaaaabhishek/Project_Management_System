package com.rest_api.keyclock_rest.service;
public interface RoleService {

    void assignRole(String userId ,String roleName);
    void deleteRoleFromUser(String userId ,String roleName);

}

