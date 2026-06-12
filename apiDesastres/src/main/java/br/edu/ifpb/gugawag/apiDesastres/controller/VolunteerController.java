package br.edu.ifpb.gugawag.apiDesastres.controller;

import br.edu.ifpb.gugawag.apiDesastres.model.Volunteer;
import br.edu.ifpb.gugawag.apiDesastres.service.VolunteerService;
import br.edu.ifpb.gugawag.apiDesastres.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/volunteers")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;

    @GetMapping
    public List<Volunteer> getVolunteers() {
        return this.volunteerService.getVolunteers();
    }

    @GetMapping("/{id}")
    public Volunteer getVolunteerById(@PathVariable("id") Long idVolunteer) {
        return this.volunteerService.getVolunteerById(idVolunteer);
    }

    @PostMapping
    public Volunteer createVolunteer(@RequestBody Volunteer volunteer){
        User userLoggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.volunteerService.createOrUpdate(volunteer, userLoggedIn);
    }

    @PutMapping("/{id}")
    public Volunteer updateVolunteer(@RequestBody Volunteer volunteer){
        User userLoggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.volunteerService.createOrUpdate(volunteer, userLoggedIn);
    }

    @DeleteMapping("/{id}")
    public void deleteVolunteer(@PathVariable("id") Long id) {
        User userLoggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        this.volunteerService.delete(id, userLoggedIn);
    }
}
