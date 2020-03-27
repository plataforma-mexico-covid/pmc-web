package mx.mexicocovid19.plataforma.controller.mapper;

import mx.mexicocovid19.plataforma.controller.dto.AyudaDTO;
import mx.mexicocovid19.plataforma.model.entity.Ayuda;
import mx.mexicocovid19.plataforma.util.DateUtil;

import java.util.List;
import java.util.stream.Collectors;

public class AyudaMapper {
    public static AyudaDTO from(final Ayuda ayuda) {
        final AyudaDTO ayudaDTO = new AyudaDTO();
        ayudaDTO.setId(ayuda.getId());
        ayudaDTO.setDescripcion(ayuda.getDescripcion());
        ayudaDTO.setCiudadano(CiudadanoMapper.from(ayuda.getCiudadano()));
        ayudaDTO.setUbicacion(AddressMapper.from(ayuda.getUbicacion()));
        ayudaDTO.setTipoAyuda(TipoAyudaMapper.from(ayuda.getTipoAyuda()));
        ayudaDTO.setOrigenAyuda(ayuda.getOrigenAyuda());
        ayudaDTO.setFechaRegistro(DateUtil.formatDTO(ayuda.getFechaRegistro()));
        return ayudaDTO;
    }

    public static List<AyudaDTO> from(final List<Ayuda> ayudas) {
        return ayudas.stream().map(AyudaMapper::from).collect(Collectors.toList());
    }
}
