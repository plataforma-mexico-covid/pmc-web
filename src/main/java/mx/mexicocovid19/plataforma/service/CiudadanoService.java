package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.Ciudadano;
import mx.mexicocovid19.plataforma.model.entity.User;

public interface CiudadanoService {
    Ciudadano readCiudadano(final User user);
}
