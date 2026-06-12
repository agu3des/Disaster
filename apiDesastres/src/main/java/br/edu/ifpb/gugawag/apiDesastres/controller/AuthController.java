package br.edu.ifpb.gugawag.apiDesastres.controller;

import br.edu.ifpb.gugawag.apiDesastres.security.JwtService;
import br.edu.ifpb.gugawag.apiDesastres.model.User;
import br.edu.ifpb.gugawag.apiDesastres.repositories.UserRepository; 

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") 
public class AuthController {

    private static final String CLIENT_ID = "546841987983-qtjbnjgiet03tbk03uqiavtsdvbpmee0.apps.googleusercontent.com";

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository; 

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

class TokenRequest {
    private String token;
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}