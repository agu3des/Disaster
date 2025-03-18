package br.edu.ifpb.gugawag.apiDesastres.controller;

import br.edu.ifpb.gugawag.apiDesastres.model.Desastre;
import br.edu.ifpb.gugawag.apiDesastres.service.DesastreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/desastres")
public class DesastreController {

    @Autowired
    private DesastreService desastreService;

    @GetMapping
    public List<Desastre> getDesastres() {
        return this.desastreService.getDesastres();
    }

    @GetMapping("/{id}")
    public Desastre getDesastrePorId(@PathVariable("id") Long idDesastre) {
        return this.desastreService.getDesastrePorId(idDesastre);
    }

    @PostMapping
    public Desastre inserirDesastre(@RequestBody Desastre desastre){
        return this.desastreService.cadastrarOuAtualizar(desastre);
    }

    @PutMapping("/{id}")
    public Desastre atualizarDesastre(@RequestBody Desastre desastre){
        return this.desastreService.cadastrarOuAtualizar(desastre);
    }

    @DeleteMapping("/{id}")
    public void apagarDesastre(@PathVariable("id") Long id) {
        this.desastreService.apagar(id);
    }
}
