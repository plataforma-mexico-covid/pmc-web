package mx.mexicocovid19.plataforma.model.repository;

import mx.mexicocovid19.plataforma.model.entity.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTokenRepository extends JpaRepository<UserToken, String> {
}
