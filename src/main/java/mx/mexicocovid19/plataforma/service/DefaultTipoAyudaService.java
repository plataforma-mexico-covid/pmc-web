package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.TipoAyuda;
import mx.mexicocovid19.plataforma.model.repository.TipoAyudaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultTipoAyudaService implements TipoAyudaService {

    @Autowired
    private  TipoAyudaRepository tipoAyudaRepository;

    @Override
    public List<TipoAyuda> readTipoAyudas() {
        return tipoAyudaRepository.findAll();
    }
}
