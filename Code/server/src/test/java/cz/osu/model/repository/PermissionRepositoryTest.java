package cz.osu.model.repository;

import cz.osu.model.entity.User;
import cz.osu.model.entity.Permission;
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

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Sql(scripts = {"file:src/main/resources/db_scripts/user.sql", "file:src/main/resources/db_scripts/permission.sql"})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class PermissionRepositoryTest {
    @Autowired
    private DataSource dataSource;
    @Autowired private EntityManager entityManager;
    @Autowired private PermissionRepository permissionRepository;
    @Autowired private UserRepository userRepository;

    @Test
    public void injectedComponentsAreNotNull() {
        assertNotNull(entityManager);
        assertNotNull(permissionRepository);
    }
    @Test
    public void injectedDatasourceIsNotNull(){
        assertNotNull(dataSource);
    }

    @Test
    public void findByIdFromPopulationScript(){
        long id = 20;
        String name = "Arlyne";
        Permission permission = permissionRepository.getOne(id);
        assertNotNull(permission);
        assertEquals(id, permission.getId());
        assertNotNull(permission.getName());
        assertEquals(name, permission.getName());
    }

    @Test
    public void insertPermission(){
        Permission newPermission = new Permission();
        newPermission.setName("ROLE_ADMINISTRATOR");

        long accountId = 30;
        User user = userRepository.getOne(accountId);
        List<User> userList = new ArrayList<User>();
        newPermission.setPermissionUsers(userList);

        Permission insertedPermission = permissionRepository.save(newPermission);

        assertNotNull(insertedPermission);
        assertNotNull(insertedPermission.getId());
        assertEquals(newPermission.getName(), insertedPermission.getName());
    }
}
