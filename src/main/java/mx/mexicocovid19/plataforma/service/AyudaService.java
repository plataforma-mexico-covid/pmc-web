package mx.mexicocovid19.plataforma.service;

import mx.mexicocovid19.plataforma.model.entity.Ayuda;

import java.util.List;

public interface AyudaService {
    List<Ayuda> readAyudas(String origenAyuda, Double longitude, Double latitude, Integer kilometers);
}
