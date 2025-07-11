package br.edu.ifpb.gugawag.apiDesastres.service;

import br.edu.ifpb.gugawag.apiDesastres.model.Ong;
import br.edu.ifpb.gugawag.apiDesastres.repositories.OngRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OngService {

    @Autowired
    private OngRepository ongRepository;

    public List<Ong> getOngs() {
        return this.ongRepository.findAll();
    }

    public Ong getOngPorId(Long id) {
        return this.ongRepository.findById(id).orElse(null);
    }

     @Transactional
    public Ong cadastrarOuAtualizar(Ong ong) {
        return this.ongRepository.save(ong);
    }

    public void apagar(Long id) {
        this.ongRepository.deleteById(id);
    }
    public List<Ong> buscarPorRegiao(String regiaoAtuacao) {
    return this.ongRepository.findByRegiaoAtuacao(regiaoAtuacao);
    }

    public List<Ong> buscarPorNome(String nome) {
        return this.ongRepository.findByNomeContainingIgnoreCase(nome);
    }

}
