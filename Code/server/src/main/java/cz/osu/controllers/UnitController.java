package cz.osu.controllers;

import cz.osu.model.entity.Position;
import cz.osu.model.entity.Unit;
import cz.osu.model.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UnitController {
    @Autowired
    private UnitService unitService;

    @Secured({"ROLE_ACCOUNTANT","ROLE_ADMIN"})
    @GetMapping("/unit/list")
    public List<Unit> unitList() {
        return unitService.list();
    }

    @Secured({"ROLE_ACCOUNTANT","ROLE_ADMIN"})
    @GetMapping("/unit")
    public Unit unitById(@RequestParam(value = "id", defaultValue = "1") Long id) {
        return unitService.getById(id);
    }
}
