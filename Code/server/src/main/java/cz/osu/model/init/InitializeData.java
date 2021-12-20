package cz.osu.model.init;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;

@Component
public class InitializeData {

    @Autowired
    private DataSource dataSource;

    @EventListener(ApplicationReadyEvent.class)
    public void loadData() {
        ResourceDatabasePopulator resourceDatabasePopulator = new ResourceDatabasePopulator
                        (false, false, "UTF-8");
        resourceDatabasePopulator.addScript(new ClassPathResource("db_scripts/agenda.sql"));
        resourceDatabasePopulator.addScript(new ClassPathResource("db_scripts/document_type.sql"));
        resourceDatabasePopulator.addScript(new ClassPathResource("db_scripts/employee.sql"));
        resourceDatabasePopulator.addScript(new ClassPathResource("db_scripts/document.sql"));
        resourceDatabasePopulator.addScript(new ClassPathResource("db_scripts/position.sql"));
        resourceDatabasePopulator.addScript(new ClassPathResource("db_scripts/user.sql"));
        resourceDatabasePopulator.addScript(new ClassPathResource("db_scripts/permission.sql"));
        resourceDatabasePopulator.addScript(new ClassPathResource("db_scripts/user_permission.sql"));
        resourceDatabasePopulator.addScript(new ClassPathResource("db_scripts/unit.sql"));

        resourceDatabasePopulator.execute(dataSource);
    }
}
