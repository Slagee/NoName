package cz.osu.controllers;

import cz.osu.model.entity.Unit;
import cz.osu.model.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UnitController {
    @Autowired
    private UnitService unitService;

    @Secured({"ROLE_ACCOUNTANT","ROLE_ADMIN"})
    @GetMapping("/unit/list")
    public Page<Unit> unitList(Pageable pageable) {
        return unitService.list(pageable);
    }

    @Secured({"ROLE_ACCOUNTANT","ROLE_ADMIN"})
    @GetMapping("/unit/{id}")
    public Unit unitById(@PathVariable("id") Long id) {
        return unitService.getById(id);
    }
}
