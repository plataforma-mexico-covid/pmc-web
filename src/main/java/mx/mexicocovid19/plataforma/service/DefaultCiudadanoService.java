package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.Ciudadano;
import mx.mexicocovid19.plataforma.model.entity.User;
import mx.mexicocovid19.plataforma.model.repository.CiudadanoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DefaultCiudadanoService implements CiudadanoService {

    @Autowired
    private CiudadanoRepository ciudadanoRepository;

    @Override
    public Ciudadano readCiudadano(final User user) {
        return ciudadanoRepository.findByUser(user);
    }
}
