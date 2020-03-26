package mx.mexicocovid19.plataforma.model.repository;

import mx.mexicocovid19.plataforma.model.entity.Ciudadano;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CiudadanoRepository extends JpaRepository<Ciudadano, Integer> {
}
