package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.Municipality;

import java.util.List;

public interface MunicipalityService {
    List<Municipality> readMunicipalitiesByProvince(Integer idProvince);
}
