package mx.mexicocovid19.plataforma.model.repository;

import org.springframework.data.repository.CrudRepository;
import mx.mexicocovid19.plataforma.model.entity.User;
import mx.mexicocovid19.plataforma.model.entity.UserRole;

import java.util.Set;

/**
 * Created by betuzo on 27/01/15.
 */
public interface UserRoleRepository extends CrudRepository<UserRole, String> {
    Set<UserRole> findAllByUser(User user);
}