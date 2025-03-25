package com.rest_api.keyclock_rest.service.Impl;
import com.rest_api.keyclock_rest.dto.UserRecord;
import com.rest_api.keyclock_rest.service.UserService;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
@Service
@Slf4j
public class UserServiceImpl implements UserService {
    @Value("${app.keycloak.realm}")
    private String realm;
    private final Keycloak keycloak;

    public UserServiceImpl(Keycloak keycloak) {
        this.keycloak = keycloak;
    }

    @Override
    public String createUser(UserRecord newUserRecord) {

        UserRepresentation  userRepresentation= new UserRepresentation();
        userRepresentation.setEnabled(true);
        userRepresentation.setFirstName(newUserRecord.getFirstName());
        userRepresentation.setLastName(newUserRecord.getLastName());
        userRepresentation.setUsername(newUserRecord.getUsername());
        userRepresentation.setEmail(newUserRecord.getUsername());
        userRepresentation.setEmailVerified(false);

        CredentialRepresentation credentialRepresentation=new CredentialRepresentation();
        credentialRepresentation.setValue(newUserRecord.getPassword());
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);

        userRepresentation.setCredentials(List.of(credentialRepresentation));

        UsersResource usersResource = getUsersResource();

        Response response = usersResource.create(userRepresentation);

        log.info("Status Code "+response.getStatus());

        if(!Objects.equals(201,response.getStatus())){

            throw new RuntimeException("Status code "+response.getStatus());
        }
        log.info("New user has been created");

        List<UserRepresentation> userRepresentations = usersResource.searchByUsername(newUserRecord.getUsername(), true);
        userRepresentations.stream().forEach(System.out::println);
        UserRepresentation userRepresentation1 = userRepresentations.get(0);
        System.out.println(userRepresentation1);

//        sendVerificationEmail(userRepresentation1.getId());

        String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
        return userId;
    }
    @Override
    public void sendVerificationEmail(String userId) {

        UsersResource usersResource = getUsersResource();
        usersResource.get(userId).sendVerifyEmail();
    }
    @Override
    public void deleteUser(String userId) {
        UsersResource usersResource = getUsersResource();
        usersResource.delete(userId);
    }
    @Override
    public void forgotPassword(String username) {

        UsersResource usersResource = getUsersResource();
        List<UserRepresentation> userRepresentations = usersResource.searchByUsername(username, true);
        UserRepresentation userRepresentation1 = userRepresentations.get(0);
        UserResource userResource = usersResource.get(userRepresentation1.getId());
        userResource.executeActionsEmail(List.of("UPDATE_PASSWORD"));
    }
    @Override
    public UserResource getUser(String userId) {
        UsersResource usersResource = getUsersResource();
        return usersResource.get(userId);
    }
    @Override
    public List<RoleRepresentation> getUserRoles(String userId) {


        return getUser(userId).roles().realmLevel().listAll();
    }
    @Override
    public List<GroupRepresentation> getUserGroups(String userId) {
        return getUser(userId).groups();
    }
    private UsersResource getUsersResource(){
        return keycloak.realm(realm).users();
    }
}

