package org.example.backend.auth;

import org.example.backend.user.User;
import org.example.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final TokenService tokenService;
    private final UserService userService;
    private final CustomUserDetailsService customUserDetailsService;

    @Autowired
    public AuthController(TokenService tokenService, UserService userService, CustomUserDetailsService customUserDetailsService) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(Authentication authentication) {
        User user = userService.getUserByUsername(authentication.getName());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = tokenService.generateToken(authentication);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Access-Control-Expose-Headers", "Authorization");

        return new ResponseEntity<>(user, headers, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        if (!user.getType().equals("ROLE_CANDIDATE") && !user.getType().equals("ROLE_MANAGER")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        if (userService.getUserByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().build();
        }
        User createdUser = userService.createUser(user);
        if (createdUser == null) {
            return ResponseEntity.internalServerError().build();
        }
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(createdUser.getUsername());
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, user.getPassword(), userDetails.getAuthorities());
        String token = tokenService.generateToken(authentication);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Access-Control-Expose-Headers", "Authorization");

        return new ResponseEntity<>(createdUser, headers, HttpStatus.OK);
    }
}
