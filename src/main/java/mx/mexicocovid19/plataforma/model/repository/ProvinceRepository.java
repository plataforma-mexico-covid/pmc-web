package mx.mexicocovid19.plataforma.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import mx.mexicocovid19.plataforma.model.entity.Province;

public interface ProvinceRepository extends JpaRepository<Province, Integer> {
}
