package mx.mexicocovid19.plataforma.controller.mapper;

import mx.mexicocovid19.plataforma.controller.dto.CiudadanoContactoDTO;
import mx.mexicocovid19.plataforma.model.entity.CiudadanoContacto;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class CiudadanoContactoMapper {
    public static CiudadanoContactoDTO from(final CiudadanoContacto ciudadanoContacto) {
        final CiudadanoContactoDTO ciudadanoContactoDTO = new CiudadanoContactoDTO();
        ciudadanoContactoDTO.setId(ciudadanoContacto.getId());
        ciudadanoContactoDTO.setTipoContacto(ciudadanoContacto.getTipoContacto());
        ciudadanoContactoDTO.setContacto(ciudadanoContacto.getContacto());
        return ciudadanoContactoDTO;
    }

    public static List<CiudadanoContactoDTO> from(final Set<CiudadanoContacto> ciudadanoContactos) {
        return ciudadanoContactos.stream().map(CiudadanoContactoMapper::from).collect(Collectors.toList());
    }
}
