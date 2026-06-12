package br.edu.ifpb.gugawag.apiDesastres.controller;

import br.edu.ifpb.gugawag.apiDesastres.model.Disaster;
import br.edu.ifpb.gugawag.apiDesastres.model.User;
import br.edu.ifpb.gugawag.apiDesastres.service.DisasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/disasters")
public class DisasterController {

    @Autowired
    private DisasterService disasterService;

    @GetMapping
    public List<Disaster> getDisasters() {
        return this.disasterService.getDisasters();
    }

    @GetMapping("/{id}")
    public Disaster getDisasterById(@PathVariable("id") Long id) {
        return this.disasterService.getDisasterById(id);
    }

    @PostMapping
    public Disaster createDisaster(@RequestBody Disaster disaster) {
        User userLoggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.disasterService.createOrUpdate(disaster, userLoggedIn);
    }

    @PutMapping("/{id}")
    public Disaster updateDisaster(@RequestBody Disaster disaster) {
        User userLoggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.disasterService.createOrUpdate(disaster, userLoggedIn);
    }

    @DeleteMapping("/{id}")
    public void deleteDisaster(@PathVariable("id") Long id) {
        User userLoggedIn = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        this.disasterService.delete(id, userLoggedIn);
    }
}