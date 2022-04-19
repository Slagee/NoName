package cz.osu.controllers;

import cz.osu.model.entity.Employee;
import cz.osu.model.entity.EmployeeCreateDto;
import cz.osu.security.account.UserDto;
import cz.osu.model.entity.User;
import cz.osu.model.service.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    final
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Deprecated
    @Secured("ROLE_ADMIN")
    @GetMapping("/user/list")
    public List<User> accountList() {
        return userService.list();
    }

    @Secured({"ROLE_ADMIN", "ROLE_ACCOUNTANT"})
    @GetMapping("/user/page")
    @Parameters({
            @Parameter(name = "userName"),
            @Parameter(name = "email"),
    })
    public Page<User> loadUsersPage(
            @And({
                    @Spec(path = "userName", params = "userName",spec = LikeIgnoreCase.class),
                    @Spec(path = "email", params = "email", spec = LikeIgnoreCase.class),
            }) Specification<User> userSpec,
            Pageable pageable){
        return userService.loadPage(userSpec, pageable);
    }
    
    @Secured("ROLE_ADMIN")
    @GetMapping("/user")
    public User accountById(@RequestParam(value = "id", defaultValue = "1") Long id) {
        return userService.getById(id);
    }

    @Secured("ROLE_ADMIN")
    @PostMapping(path = "/user/registration", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> registerUserAccount(@RequestBody UserDto userDto) {
       User registeredUser = userService.registerNewUserAccount(userDto);
       if(registeredUser == null){
           throw new RuntimeException();
       }
       return new ResponseEntity<>("User successfully added!", HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN", "ROLE_ACCOUNTANT"})
    @PutMapping(path = "/user/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> editUserPerms(@RequestBody UserDto updateUser, @PathVariable("id") Long id) {
        User updatedUser;
        try {
            updatedUser = userService.updateUser(updateUser, id);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
    }
}