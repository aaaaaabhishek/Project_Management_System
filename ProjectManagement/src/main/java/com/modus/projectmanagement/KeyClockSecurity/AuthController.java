package com.modus.projectmanagement.KeyClockSecurity;

import com.modus.projectmanagement.payload.LoginRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Map;

@RestController
//@RequestMapping("/auth")
@CrossOrigin("http://localhost:3000")
@Slf4j
public class AuthController {
    private final WebClient webClient;
    @Value("${app.keycloak.app.tokenUrl}")
    public  String tokenUrl;
    @Value("${app.keycloak.app.clientId}")
    public String  clientId;
    @Value("${app.keycloak.app.clientSecret}")
    public String  clientSecret;

    public AuthController(WebClient.Builder webClientbuilder) {
        this.webClient =webClientbuilder.build();
    }
    @PostMapping("/login")
    public Mono<ResponseEntity<String>> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
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
                    // Create HttpOnly JWT cookie
                    ResponseCookie jwtCookie = ResponseCookie.from("jwt", accessToken)
                            .httpOnly(true)
                            .secure(false)
//                            .sameSite("Strict")
                            .path("/")
                            .maxAge(Duration.ofMinutes(15))
                            .build();
                    response.addHeader(HttpHeaders.SET_COOKIE,jwtCookie.toString());
                    return ResponseEntity.ok("Login successful");
                }) .onErrorResume(e -> {
                log.error("Error during login", e);
                return Mono.just(ResponseEntity.status(500).body("Login failed"));
            });
    }
//@GetMapping("/check")
////    public ResponseEntity<?> getcurrentUser(@AuthenticationPrincipal Jwt jwt) {
////
////    if (jwt == null) {
////        return new ResponseEntity<>(jwt, HttpStatus.UNAUTHORIZED);
////    }
//////    return ResponseEntity.ok(Map.of(
//////            "username", jwt.getClaim("preferred_username"),
//////            "roles", jwt.getClaim("realm_access")
//////    ));
////    return new ResponseEntity<>("authenticated",HttpStatus.OK);
////}
//    public ResponseEntity<?> getCurrentUser(@CurrentSecurityContext(expression="authentication") Authentication authentication) {
//    if (authentication == null || !(authentication.getPrincipal() instanceof Jwt)) {
////        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
//            return new ResponseEntity<>("authenticated",HttpStatus.OK);
//
//    }
//
//    Jwt jwt = (Jwt) authentication.getPrincipal();
//
//    return ResponseEntity.ok(Map.of(
//            "username", jwt.getClaim("preferred_username"),
//            "roles", jwt.getClaim("realm_access")
//    ));
//}

    @GetMapping("/check")
    public ResponseEntity<String> checkAuthentication(@CurrentSecurityContext(expression="authentication")Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok("Authenticated");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
    }



    @PostMapping("/logout")
    public Mono<ResponseEntity<String>> logout(HttpServletResponse response) {
        // Clear JWT cookie
        ResponseCookie clearJwtCookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
//                .sameSite("Strict")
                .path("/")
                .maxAge(0) // delete cookie
                .build();

        // Clear refresh token cookie
        ResponseCookie clearRefreshCookie = ResponseCookie.from("refresh", "")
                .httpOnly(true)
                .secure(false)
//                .sameSite("Strict")
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE,clearJwtCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE,clearRefreshCookie.toString());

        return Mono.just(ResponseEntity.ok("Logout successful"));
    }

}
