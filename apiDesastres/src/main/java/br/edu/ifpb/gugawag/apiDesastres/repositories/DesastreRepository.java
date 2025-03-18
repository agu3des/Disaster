package br.edu.ifpb.gugawag.apiDesastres.repositories;

import br.edu.ifpb.gugawag.apiDesastres.model.Desastre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DesastreRepository extends JpaRepository<Desastre, Long> {

    public List<Desastre> findByDuracaoDiasAndTipo(Integer duracaoDias, String tipo);

    @Query("SELECT d FROM Desastre d where d.duracaoDias >= 5")
    public List<Desastre> getDesastresByDias();
}
