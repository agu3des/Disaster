package br.edu.ifpb.gugawag.apiDesastres.repositories;

import br.edu.ifpb.gugawag.apiDesastres.model.Disaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DisasterRepository extends JpaRepository<Disaster, Long> {

    public List<Disaster> findByDurationDaysAndType(Integer durationDays, String type);

    @Query("SELECT d FROM Disaster d WHERE d.durationDays >= 5")
    public List<Disaster> getDisastersByDays();
}