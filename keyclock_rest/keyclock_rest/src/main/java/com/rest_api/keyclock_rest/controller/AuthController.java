package com.rest_api.keyclock_rest.controller;

import com.rest_api.keyclock_rest.dto.LoginRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

@RestController
//@RequestMapping("/auth")
@CrossOrigin("http://localhost:3000")
@Slf4j
public class AuthController {

    private final WebClient webClient;
    private final String tokenUrl = "http://localhost:8080/realms/spring/protocol/openid-connect/token";
    private final String clientId = "spring-app";
//    private final String clientSecret = "azPUJhTO1EVONnA91nwmOCkh1Pf2JRyY";
    public AuthController(WebClient.Builder webClientbuilder) {
        this.webClient =webClientbuilder.build();
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<String>> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
                System.out.println("fff");
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "password");
        formData.add("username", loginRequest.getUsername());
        formData.add("password", loginRequest.getPassword());
        formData.add("client_id", clientId);
//        formData.add("client_secret", clientSecret);

        return webClient.post()
                .uri(tokenUrl)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .bodyToMono(Map.class)
                .map(body -> {
                    String accessToken = body.get("access_token").toString();
                    log.info("acess:{}",accessToken);
                    // Create HttpOnly JWT cookie
                    ResponseCookie jwtCookie = ResponseCookie.from("jwt", accessToken)
                            .httpOnly(true)
                            .secure(false)
//                            .sameSite("Strict")
                            .path("/")
                            .maxAge(Duration.ofMinutes(15))
                            .build();
                    System.out.println("fff");
                    response.addHeader(HttpHeaders.SET_COOKIE,jwtCookie.toString());
                    return ResponseEntity.ok("Login successful");
                }) .onErrorResume(e -> {
                log.error("Error during login", e);
                return Mono.just(ResponseEntity.status(500).body("Login failed"));
            });
    }

//@GetMapping("/login/{username}/{password}")
//public Mono<ResponseEntity<String>> login(@PathVariable String username, @PathVariable String password, ServerWebExchange exchange) {
//    MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
//    formData.add("grant_type", "password");
//    formData.add("username", username);
//    formData.add("password", password);
//    formData.add("client_id", clientId);
//    formData.add("client_secret", clientSecret);
//
//    return webClient.post()
//            .uri(tokenUrl)
//            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
//            .body(BodyInserters.fromFormData(formData))
//            .retrieve()
//            .bodyToMono(Map.class)
//            .map(body -> {
//                String accessToken = body.get("access_token").toString();
//                log.info("Access Token: {}", accessToken);
//                // Create HttpOnly JWT cookie
//                ResponseCookie jwtCookie = ResponseCookie.from("jwt", accessToken)
//                        .httpOnly(true)
//                        .secure(true)
//                        .sameSite("Strict")
//                        .path("/")
//                        .maxAge(Duration.ofMinutes(15))
//                        .build();
//
//                exchange.getResponse().addCookie(jwtCookie);
//
//                return ResponseEntity.ok("Login successful");
//            })
//            .onErrorResume(e -> {
//                log.error("Error during login", e);
//                return Mono.just(ResponseEntity.status(500).body("Login failed"));
//            });
//}
    @PostMapping("/logout")
    public Mono<ResponseEntity<String>> logout(ServerHttpResponse response) {
        // Clear JWT cookie
        ResponseCookie clearJwtCookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(0) // delete cookie
                .build();

        // Clear refresh token cookie
        ResponseCookie clearRefreshCookie = ResponseCookie.from("refresh", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(0)
                .build();

        response.addCookie(clearJwtCookie);
        response.addCookie(clearRefreshCookie);

        return Mono.just(ResponseEntity.ok("Logout successful"));
    }

}
