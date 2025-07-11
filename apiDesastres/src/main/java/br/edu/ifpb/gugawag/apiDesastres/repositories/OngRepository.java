package br.edu.ifpb.gugawag.apiDesastres.repositories;

import br.edu.ifpb.gugawag.apiDesastres.model.Ong;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OngRepository extends JpaRepository<Ong, Long> {
    List<Ong> findByRegiaoAtuacao(String regiaoAtuacao);

    List<Ong> findByNomeContainingIgnoreCase(String nome);

}
