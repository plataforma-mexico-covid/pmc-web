package mx.mexicocovid19.plataforma.controller.mapper;

import mx.mexicocovid19.plataforma.controller.dto.TipoAyudaDTO;
import mx.mexicocovid19.plataforma.model.entity.TipoAyuda;

import java.util.List;
import java.util.stream.Collectors;

public class TipoAyudaMapper {
    public static TipoAyudaDTO from(final TipoAyuda tipoAyuda) {
        final TipoAyudaDTO tipoAyudaDTO = new TipoAyudaDTO();
        tipoAyudaDTO.setId(tipoAyuda.getId());
        tipoAyudaDTO.setNombre(tipoAyuda.getNombre());
        return tipoAyudaDTO;
    }

    public static List<TipoAyudaDTO> from(final List<TipoAyuda> ayudas) {
        return ayudas.stream().map(TipoAyudaMapper::from).collect(Collectors.toList());
    }
}
