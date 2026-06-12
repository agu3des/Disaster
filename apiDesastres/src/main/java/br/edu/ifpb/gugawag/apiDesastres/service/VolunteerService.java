package br.edu.ifpb.gugawag.apiDesastres.service;

import br.edu.ifpb.gugawag.apiDesastres.repositories.VolunteerRepository;
import br.edu.ifpb.gugawag.apiDesastres.model.Volunteer;
import br.edu.ifpb.gugawag.apiDesastres.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class VolunteerService {

    @Autowired
    private VolunteerRepository volunteerRepository;

    public List<Volunteer> getVolunteers() {
        return this.volunteerRepository.findAll();
    }

    public Volunteer getVolunteerById(Long volunteerId) {
        return this.volunteerRepository.findById(volunteerId).orElse(null);
    }

    @Transactional
    public Volunteer createOrUpdate(Volunteer volunteer, User userLoggedIn) {
        if (volunteer.getId() != null) {
            Volunteer volunteerExists = this.volunteerRepository.findById(volunteer.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Volunteer not found!"));

            if (!volunteerExists.getCreatedBy().getId().equals(userLoggedIn.getId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied: You are not the creator!");
            }
            
            volunteer.setCreatedBy(volunteerExists.getCreatedBy());
        } 
        else {
            volunteer.setCreatedBy(userLoggedIn);
        }
        return this.volunteerRepository.save(volunteer);
    }

    public void delete(Long id, User userLoggedIn) {
        Volunteer volunteerExists = this.volunteerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Volunteer not found!"));

        if (!volunteerExists.getCreatedBy().getId().equals(userLoggedIn.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the creator can delete!");
        }

        this.volunteerRepository.deleteById(id);
    }
}