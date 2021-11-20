package cz.osu.controllers;

import cz.osu.model.entity.Permission;
import cz.osu.model.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PermissionController {

    @Autowired
    PermissionService permissionService;

    @Secured("ROLE_ADMIN")
    @GetMapping("/permission/list")
    public List<Permission> roleList() {
        return permissionService.list();
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/permission")
    public Permission roleById(@RequestParam(value = "id", defaultValue = "1") Long id) {
        return permissionService.getById(id);
    }
}
