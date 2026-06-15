package br.edu.ifpb.gugawag.apiDesastres.controller;

import br.edu.ifpb.gugawag.apiDesastres.model.Disaster;
import br.edu.ifpb.gugawag.apiDesastres.model.User;
import br.edu.ifpb.gugawag.apiDesastres.service.DisasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("api/disasters")
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
        String userEmail = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.disasterService.createOrUpdate(disaster, userEmail);
    }

    @PutMapping("/{id}")
    public Disaster updateDisaster(@RequestBody Disaster disaster) {
        String userEmail = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.disasterService.createOrUpdate(disaster, userEmail);
    }

    @DeleteMapping("/{id}")
    public void deleteDisaster(@PathVariable("id") Long id) {
        String userEmail = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        this.disasterService.delete(id, userEmail);
    }
}