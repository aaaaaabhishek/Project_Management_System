package com.rest_api.keyclock_rest.component;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtCookieFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
for(Cookie cookie:cookies){
    if("jwt".equals(cookie.getName())){
        String jwt=cookie.getValue();
        logger.info(jwt);
        request=new HttpServletRequestWrapper(request){
            @Override
            public String getHeader(String name){
                if("Authorization".equals(name)){
                    return "Bearer"+jwt;
                }
                return super.getHeader(name);
            }
        };
                }
            }}
        filterChain.doFilter(request, response);
    }
}