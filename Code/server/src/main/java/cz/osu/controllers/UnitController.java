package cz.osu.controllers;

import cz.osu.model.entity.Employee;
import cz.osu.model.entity.EmployeeCreateDto;
import cz.osu.model.entity.Unit;
import cz.osu.model.entity.UnitCreateUpdateDto;
import cz.osu.model.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

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

    @Secured({"ROLE_ACCOUNTANT","ROLE_ADMIN", "ROLE_HR"})
    @DeleteMapping("/unit/{id}")
    public ResponseEntity<?> deleteUnit(@PathVariable("id") Long id) {
        try {
            unitService.deleteUnit(id);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Podařilo se odstranit středisko", HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN", "ROLE_ACCOUNTANT", "ROLE_HR"})
    @PostMapping(path = "/unit", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> createUnit(@RequestBody UnitCreateUpdateDto unitCreate) {
        Unit createUnit;
        try {
            createUnit = unitService.addUnit(unitCreate);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        if (createUnit == null) {
            throw new RuntimeException();
        }

        return new ResponseEntity<>(createUnit, HttpStatus.CREATED);
    }

    @Secured({"ROLE_ADMIN", "ROLE_ACCOUNTANT", "ROLE_HR"})
    @PutMapping(path = "/unit/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> editUnit(@RequestBody UnitCreateUpdateDto unitUpdate, @PathVariable("id") Long id) {
        Unit updatedUnit;
        try {
            updatedUnit = unitService.updateUnit(unitUpdate, id);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(updatedUnit, HttpStatus.OK);
    }
}
