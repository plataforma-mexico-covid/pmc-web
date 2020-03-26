package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.Ayuda;
import mx.mexicocovid19.plataforma.model.repository.AyudaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DefaultAyudaService implements AyudaService {

    @Autowired
    private AyudaRepository ayudaRepository;

    @Override
    public List<Ayuda> readAyudas(String origenAyuda, BigDecimal longitude, BigDecimal latitude, Integer kilometers) {
        return ayudaRepository.findByAllInsideOfKilometers(latitude, longitude, kilometers);
    }
}
