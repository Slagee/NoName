package cz.osu.model.service;

import cz.osu.model.entity.Permission;
import cz.osu.model.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    public List<Permission> list(){
        return permissionRepository.findAll();
    }

    public Permission getById(Long id) {
        return permissionRepository.findById(id).orElse(null);
    }
}
