package mx.mexicocovid19.plataforma.controller.mapper;

import mx.mexicocovid19.plataforma.controller.dto.CiudadanoDTO;
import mx.mexicocovid19.plataforma.model.entity.Ciudadano;

import java.util.List;
import java.util.stream.Collectors;

public class CiudadanoMapper {
    public static CiudadanoDTO from(final Ciudadano ciudadano) {
        final CiudadanoDTO ciudadanoDTO = new CiudadanoDTO();
        ciudadanoDTO.setId(ciudadano.getId());
        ciudadanoDTO.setNombre(ciudadano.getNombre());
        ciudadanoDTO.setPaterno(ciudadano.getPaterno());
        ciudadanoDTO.setMaterno(ciudadano.getMaterno());
        ciudadanoDTO.setContactos(CiudadanoContactoMapper.from(ciudadano.getContactos()));
        return ciudadanoDTO;
    }

    public static List<CiudadanoDTO> from(final List<Ciudadano> ciudadanos) {
        return ciudadanos.stream().map(CiudadanoMapper::from).collect(Collectors.toList());
    }
}
