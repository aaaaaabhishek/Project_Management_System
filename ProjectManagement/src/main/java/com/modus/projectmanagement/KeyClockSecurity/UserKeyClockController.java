package com.modus.projectmanagement.KeyClockSecurity;

import com.modus.projectmanagement.payload.UserRecord;
import com.modus.projectmanagement.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin("http://localhost:3000")
public class UserKeyClockController {
    private final UserService userService;

    public UserKeyClockController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserRecord newUserRecord) {
String userId=userService.createUser(newUserRecord);
        return new ResponseEntity<>(userId,HttpStatus.CREATED);
    }

    @PutMapping("/{id}/send-verification-email")
    public ResponseEntity<?> sendVerificationEmail(@PathVariable String id) {

        userService.sendVerificationEmail(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {

        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


    @PutMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String username) {

        userService.forgotPassword(username);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


    @GetMapping("/{id}/roles")
    public ResponseEntity<?> getUserRoles(@PathVariable String id) {

        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserRoles(id));
    }

    @GetMapping("/{id}/groups")
    public ResponseEntity<?> getUserGroups(@PathVariable String id) {

        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserGroups(id));
    }

}