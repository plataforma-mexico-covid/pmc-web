package mx.mexicocovid19.plataforma.controller.mapper;

import mx.mexicocovid19.plataforma.controller.dto.ProvinceDTO;
import mx.mexicocovid19.plataforma.model.entity.Province;

import java.util.List;
import java.util.stream.Collectors;

public class ProvinceMapper {
    public static ProvinceDTO from(final Province province) {
        final ProvinceDTO provinceDTO = new ProvinceDTO();
        provinceDTO.setId(province.getId());
        provinceDTO.setName(province.getNombre());
        provinceDTO.setAbbreviation(province.getAbreviatura());
        return provinceDTO;
    }

    public static List<ProvinceDTO> from(final List<Province> provinces) {
        return provinces.stream().map(ProvinceMapper::from).collect(Collectors.toList());
    }
}
