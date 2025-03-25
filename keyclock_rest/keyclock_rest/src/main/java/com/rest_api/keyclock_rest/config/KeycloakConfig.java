package com.rest_api.keyclock_rest.config;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;


@Configuration
public class KeycloakConfig {

    @Value("${app.keycloak.admin.clientId}")
    private String clientId;
    @Value("${app.keycloak.admin.clientSecret}")
    private String clientSecret;
    @Value("${app.keycloak.realm}")
    private String realm;
    @Value("${app.keycloak.serverUrl}")
    private String serverUrl;


    @Bean
    public org.keycloak.admin.client.Keycloak keycloak(){

        return KeycloakBuilder.builder()
                .clientSecret(clientSecret)
                .clientId(clientId)
                .grantType("client_credentials")
                .realm(realm)
                .serverUrl(serverUrl)
                .build();
    }
    @Bean
    public WebClient getWebclient(){
        return WebClient.builder().build();
    }
}
