package cz.osu.controllers;

import cz.osu.model.entity.Employee;
import cz.osu.model.entity.Position;
import cz.osu.model.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class PositionController {
    @Autowired
    private PositionService positionService;

    @Secured({"ROLE_ACCOUNTANT","ROLE_HR","ROLE_REGISTRY_WORKER","ROLE_VOLUNTEER_COORDINATOR","ROLE_PROJECT_COORDINATOR"})
    @GetMapping("/position/list")
    public List<Position> employeeList() {
        return positionService.list();
    }

    @Secured({"ROLE_ACCOUNTANT","ROLE_HR","ROLE_REGISTRY_WORKER","ROLE_VOLUNTEER_COORDINATOR","ROLE_PROJECT_COORDINATOR"})
    @GetMapping("/position")
    public Position employeeById(@RequestParam(value = "id", defaultValue = "1") Long id) {
        return positionService.getById(id);
    }
}
