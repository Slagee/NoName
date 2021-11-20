package cz.osu.model.repository;

import cz.osu.model.entity.Permission;
import cz.osu.model.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Sql(scripts = {"file:src/main/resources/db_scripts/permission.sql", "file:src/main/resources/db_scripts/user.sql", "file:src/main/resources/db_scripts/user_permission.sql"})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {
    @Autowired private DataSource dataSource;
    @Autowired private EntityManager entityManager;
    @Autowired private UserRepository userRepository;
    @Autowired private PermissionRepository permissionRepository;

    @Test
    public void injectedComponentsAreNotNull() {
        assertNotNull(entityManager);
        assertNotNull(userRepository);
    }
    @Test
    public void injectedDatasourceIsNotNull(){
        assertNotNull(dataSource);
    }

    @Test
    public void findByIdFromPopulationScript(){
        long id = 36;
        String email = "rgoreyz@businessinsider.com";
        User user = userRepository.getOne(id);
        assertNotNull(user);
        assertEquals(id, user.getId());
        assertNotNull(user.getEmail());
        assertEquals(email, user.getEmail());
    }

    @Test
    public void insertUser(){
        User newUser = new User();
        newUser.setUserName("janpawlas");
        newUser.setEmail("janpawlas@ucetnici.cz");

        long roleId = 3;
        Permission permission = permissionRepository.getOne(roleId);
        List<Permission> listOfPermissions = new ArrayList<Permission>();
        listOfPermissions.add(permission);
        newUser.setUserPermissions(listOfPermissions);

        User insertedEmployee = userRepository.save(newUser);

        assertNotNull(insertedEmployee);
        assertNotNull(insertedEmployee.getId());
        assertEquals(newUser.getUserName(), insertedEmployee.getUserName());
        assertEquals(newUser.getEmail(), insertedEmployee.getEmail());
    }
}
