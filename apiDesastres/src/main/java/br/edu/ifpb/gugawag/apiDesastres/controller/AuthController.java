package br.edu.ifpb.gugawag.apiDesastres.controller;

import br.edu.ifpb.gugawag.apiDesastres.model.User;
import br.edu.ifpb.gugawag.apiDesastres.repositories.UserRepository;
import br.edu.ifpb.gugawag.apiDesastres.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") 
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    private static final String CLIENT_ID = "546841987983-qtjbnjgiet03tbk03uqiavtsdvbpmee0.apps.googleusercontent.com";

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; 

    // ======== 1. ROTA DE LOGIN MANUAL ========
    @PostMapping("/login")
    public ResponseEntity<?> loginManual(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            String systemToken = jwtService.generateToken(authentication.getName());
            return ResponseEntity.ok(Map.of("token", systemToken));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "E-mail or password invalid!"));
        }
    }

    // ======== 2. ROTA DE CADASTRO MANUAL ========
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "E-mail alredy registred!"));
        }

        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword())); 
        newUser.setProvider("LOCAL");
        userRepository.save(newUser);

        String systemToken = jwtService.generateToken(newUser.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("token", systemToken, "message", "User created!"));
    }

    @PostMapping("/google")
    public ResponseEntity<?> loginGoogle(@RequestBody TokenRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();

            GoogleIdToken idToken = verifier.verify(request.getToken());

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                Optional<User> userOptional = userRepository.findByEmail(email);
                
                if (userOptional.isEmpty()) {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setName(name); 
                    
                    newUser.setProvider("GOOGLE"); 
                    
                    userRepository.save(newUser); 
                }
                String systemToken = jwtService.generateToken(email);

                return ResponseEntity.ok(Map.of("token", systemToken)); 
                
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Google Token invalid!"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error in token validation: " + e.getMessage()));
        }
    }
    
}

class LoginRequest {
    private String name;
    private String email;
    private String password;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

class TokenRequest {
    private String token;
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}