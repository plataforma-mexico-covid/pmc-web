package mx.mexicocovid19.plataforma.controller.mapper;

import mx.mexicocovid19.plataforma.controller.dto.MunicipalityDTO;
import mx.mexicocovid19.plataforma.model.entity.Municipality;

import java.util.List;
import java.util.stream.Collectors;

public class MunicipalityMapper {
    public static MunicipalityDTO from(final Municipality municipality) {
        final MunicipalityDTO municipalityDTO = new MunicipalityDTO();
        municipalityDTO.setId(municipality.getId());
        municipalityDTO.setName(municipality.getNombre());
        municipalityDTO.setFullname(municipality.getNombreOficial());
        municipalityDTO.setIdExternal(municipality.getIdExterno());
        return municipalityDTO;
    }

    public static List<MunicipalityDTO> from(final List<Municipality> municipalities) {
        return municipalities.stream().map(MunicipalityMapper::from).collect(Collectors.toList());
    }
}
