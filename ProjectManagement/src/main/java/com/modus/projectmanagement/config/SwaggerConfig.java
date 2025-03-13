package com.modus.projectmanagement.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//http://localhost:8080/swagger-ui/index.html
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI getOpenAPI(){

        return new OpenAPI()
                .info(new Info()
                        .title("Project Management System")
                        .version("1.0.0")
                        .description("creating the project management system")
                        .contact(new Contact()
                                .name("12344")
                                .email("@gmail.com")
                                .url("https://modussystems.com/index.html"))

                );
    }
}
