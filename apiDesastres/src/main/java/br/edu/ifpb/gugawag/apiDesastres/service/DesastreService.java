package br.edu.ifpb.gugawag.apiDesastres.service;

import br.edu.ifpb.gugawag.apiDesastres.repositories.DesastreRepository;
import br.edu.ifpb.gugawag.apiDesastres.model.Desastre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DesastreService {

    @Autowired
    private DesastreRepository desastreRepository;

    public List<Desastre> getDesastres() {
        return this.desastreRepository.findAll();
    }

    public Desastre getDesastrePorId(Long idDesastre) {
        return this.desastreRepository.findById(idDesastre).orElse(null);
    }

    @Transactional
    public Desastre cadastrarOuAtualizar(Desastre desastre) {
        Desastre desastreInserido = this.desastreRepository.save(desastre);
        return desastreInserido;
    }

    public void apagar(Long id) {
        this.desastreRepository.deleteById(id);
    }
}


