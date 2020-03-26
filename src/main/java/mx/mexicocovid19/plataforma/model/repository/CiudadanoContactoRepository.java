package mx.mexicocovid19.plataforma.model.repository;

import mx.mexicocovid19.plataforma.model.entity.CiudadanoContacto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CiudadanoContactoRepository extends JpaRepository<CiudadanoContacto, Integer> {
}
