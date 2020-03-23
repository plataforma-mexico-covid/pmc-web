package mx.mexicocovid19.plataforma.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import mx.mexicocovid19.plataforma.ApiController;
import mx.mexicocovid19.plataforma.controller.dto.MunicipalityDTO;
import mx.mexicocovid19.plataforma.controller.dto.ProvinceDTO;
import mx.mexicocovid19.plataforma.controller.mapper.MunicipalityMapper;
import mx.mexicocovid19.plataforma.controller.mapper.ProvinceMapper;
import mx.mexicocovid19.plataforma.service.MunicipalityService;
import mx.mexicocovid19.plataforma.service.ProvinceService;

import java.util.List;

/**
 * Created by betuzo on 14/05/15.
 */
@Controller
@RequestMapping(ApiController.API_PATH_PRIVATE + "/address")
public class AddressRestController {

    @Autowired
    private ProvinceService provinceService;

    @Autowired
    private MunicipalityService municipalityService;

    @ResponseBody
    @GetMapping(
            value = { "/province" },
            produces = {"application/json;charset=UTF-8"})
    public List<ProvinceDTO> readProvinces() {
        return ProvinceMapper.from(provinceService.readProvinces());
    }

    @ResponseBody
    @GetMapping(
            value = { "/province/{province}/municipality" },
            produces = {"application/json;charset=UTF-8"})
    public List<MunicipalityDTO> readMunicipalitiesByProvince(@PathVariable(value = "province") Integer idProvince) {
        return MunicipalityMapper.from(municipalityService.readMunicipalitiesByProvince(idProvince));
    }
}
