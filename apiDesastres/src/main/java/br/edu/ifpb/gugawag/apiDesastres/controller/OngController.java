package br.edu.ifpb.gugawag.apiDesastres.controller;

import br.edu.ifpb.gugawag.apiDesastres.model.Ong;
import br.edu.ifpb.gugawag.apiDesastres.service.OngService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ongs")
public class OngController {

    @Autowired
    private OngService ongService;

    @GetMapping
    public List<Ong> getOngs() {
        return this.ongService.getOngs();
    }

    @GetMapping("/{id}")
    public Ong getOngPorId(@PathVariable("id") Long id) {
        return this.ongService.getOngPorId(id);
    }

    @PostMapping
    public Ong inserirOng(@RequestBody Ong ong){
        return this.ongService.cadastrarOuAtualizar(ong);
    }

    @PutMapping("/{id}")
    public Ong atualizarOng(@RequestBody Ong ong){
        return this.ongService.cadastrarOuAtualizar(ong);
    }

    @DeleteMapping("/{id}")
    public void apagarOng(@PathVariable("id") Long id) {
        this.ongService.apagar(id);
    }
    @GetMapping("/buscar/regiao")
    public List<Ong> buscarPorRegiao(@RequestParam("regiao") String regiao) {
        return this.ongService.buscarPorRegiao(regiao);
    }

    @GetMapping("/buscar/nome")
    public List<Ong> buscarPorNome(@RequestParam("nome") String nome) {
        return this.ongService.buscarPorNome(nome);
    }

}
