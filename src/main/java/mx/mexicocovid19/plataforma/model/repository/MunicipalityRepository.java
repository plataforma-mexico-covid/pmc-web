package mx.mexicocovid19.plataforma.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import mx.mexicocovid19.plataforma.model.entity.Municipality;
import mx.mexicocovid19.plataforma.model.entity.Province;

import java.util.List;

public interface MunicipalityRepository extends JpaRepository<Municipality, Integer> {
    List<Municipality> findAllByProvince(final Province province);
}
