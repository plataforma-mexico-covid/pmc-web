package mx.mexicocovid19.plataforma.model.repository

import mx.mexicocovid19.plataforma.model.entity.OrigenAyuda
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Profile
import spock.lang.Specification
import spock.lang.Unroll

@SpringBootTest
@Profile("localdb")
class AyudaRepositoryTest extends Specification {

    @Autowired
    private AyudaRepository ayudaRepository

    @Unroll("Escenario numero #index se buscan ayudas tipo: #tipoAyuda, a menos de :kilometers km de :latitude / :longitude")
    def "Validar consulta de ayudas"() {
        expect:
        total == ayudaRepository.findByAllInsideOfKilometersByOrigenAyuda(latitude, longitude, kilometers, origenAyuda).size()

        where:
        index | origenAyuda | kilometers | latitude | longitude | total
        0 | OrigenAyuda.SOLICITA | 1 | 19.429386 | -99.158080 | 1
    }
}
