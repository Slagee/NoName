package cz.osu.controllers;

import cz.osu.model.entity.Employee;
import cz.osu.model.service.EmployeeService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @Deprecated
    @GetMapping("/employee/list")
    public List<Employee> employeeList() {
        return employeeService.list();
    }

    @Secured({"ROLE_ACCOUNTANT","ROLE_HR","ROLE_REGISTRY_WORKER","ROLE_VOLUNTEER_COORDINATOR","ROLE_PROJECT_COORDINATOR"})
    @GetMapping("/employee")
    public Employee employeeById(@RequestParam(value = "id", defaultValue = "1") Long id) {
        return employeeService.getById(id);
    }

    @Secured({"ROLE_ACCOUNTANT","ROLE_HR","ROLE_REGISTRY_WORKER","ROLE_VOLUNTEER_COORDINATOR","ROLE_PROJECT_COORDINATOR"})
    @GetMapping(value = "/employee/page")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name", dataTypeClass = String.class, paramType = "query"),
            @ApiImplicitParam(name = "surname",  dataTypeClass = String.class, paramType = "query"),
            @ApiImplicitParam(name = "birthNumber", dataTypeClass = String.class, paramType = "query"),
    })
    public Page<Employee> loadEmployeePage(
            @And({
                    @Spec(path = "name", params = "name",spec = LikeIgnoreCase.class),
                    @Spec(path = "surname", params = "surname", spec = LikeIgnoreCase.class),
                    @Spec(path = "birthNumber", params = "birthNumber", spec = LikeIgnoreCase.class)
            }) Specification<Employee> employeeSpec,
            Pageable pageable){
        return employeeService.loadPage(employeeSpec, pageable);
    }
}