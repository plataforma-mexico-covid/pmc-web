package mx.mexicocovid19.plataforma.model.repository;

import mx.mexicocovid19.plataforma.model.entity.Ayuda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface AyudaRepository extends JpaRepository<Ayuda, Integer> {
    @Query("select ayuda " +
            " FROM Ayuda ayuda" +
            " where " +
            " (acos(sin(:latitudeRef)*sin(radians(ayuda.ubicacion.latitude)) + cos(:latitudeRef)*cos(radians(ayuda.ubicacion.latitude))*cos(radians(ayuda.ubicacion.longitude)-:longitudeRef)) * 6371 ) <= :kilometers ")
    List<Ayuda> findByAllInsideOfKilometers(@Param("latitudeRef") BigDecimal latitudeRef,
                                           @Param("longitudeRef") BigDecimal longitudeRef,
                                           @Param("kilometers") Integer kilometers);
}
