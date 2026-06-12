package br.edu.ifpb.gugawag.apiDesastres.service;

import br.edu.ifpb.gugawag.apiDesastres.repositories.DisasterRepository;
import br.edu.ifpb.gugawag.apiDesastres.model.Disaster;
import br.edu.ifpb.gugawag.apiDesastres.model.User;
import br.edu.ifpb.gugawag.apiDesastres.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DisasterService {

    @Autowired
    private DisasterRepository disasterRepository;
    
    @Autowired
    private UserRepository userRepository;

    public List<Disaster> getDisasters() {
        return this.disasterRepository.findAll();
    }

    public Disaster getDisasterById(Long id) {
        return this.disasterRepository.findById(id).orElse(null);
    }

    @Transactional
    public Disaster createOrUpdate(Disaster disaster, String userEmail) {
        // O Service resolve a busca do usuário sem expor o Repository para o Controller
        User userLoggedIn = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!"));

        if (disaster.getId() != null) {
            Disaster disasterExists = this.disasterRepository.findById(disaster.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Disaster not found!"));
            
            if (!disasterExists.getCreatedBy().getId().equals(userLoggedIn.getId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied: You are not the creator!");
            }
            disaster.setCreatedBy(disasterExists.getCreatedBy());
        } 
        else {
            disaster.setCreatedBy(userLoggedIn);
        }
        return this.disasterRepository.save(disaster);
    }
    
    public void delete(Long id, String userEmail) {
        User userLoggedIn = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!"));

        Disaster disasterExists = this.disasterRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Disaster not found!"));

        if (!disasterExists.getCreatedBy().getId().equals(userLoggedIn.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the creator can delete!");
        }

        this.disasterRepository.deleteById(id);
    }
}