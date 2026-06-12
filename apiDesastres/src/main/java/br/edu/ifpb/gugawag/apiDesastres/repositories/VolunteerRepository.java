package br.edu.ifpb.gugawag.apiDesastres.repositories;

import br.edu.ifpb.gugawag.apiDesastres.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {

    public List<Volunteer> findByNameAndEmail(String name, String email);

}
