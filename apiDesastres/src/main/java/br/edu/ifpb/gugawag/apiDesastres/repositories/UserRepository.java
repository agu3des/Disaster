package br.edu.ifpb.gugawag.apiDesastres.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.ifpb.gugawag.apiDesastres.model.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String name);

    Optional<User> findByEmail(String email);
     
    public List<User> findByNameAndEmail(String name, String email);
}
