package mx.mexicocovid19.plataforma.model.repository;

import org.springframework.data.repository.CrudRepository;
import mx.mexicocovid19.plataforma.model.entity.User;

/**
 * Created by betuzo on 25/01/15.
 */
public interface UserRepository extends CrudRepository<User, String> {
    User findByUsername(String username);
}
