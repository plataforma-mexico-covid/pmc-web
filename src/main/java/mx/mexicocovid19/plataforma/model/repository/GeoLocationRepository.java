package mx.mexicocovid19.plataforma.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import mx.mexicocovid19.plataforma.model.entity.GeoLocation;

public interface GeoLocationRepository extends JpaRepository<GeoLocation, Integer> {
}
