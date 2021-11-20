package cz.osu.model.entity;

// import cz.osu.model.exclude.AccountRole;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 64)
    private String name;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name="user_permission", joinColumns = @JoinColumn(name="permission_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="user_id", referencedColumnName = "id"),
            uniqueConstraints = {@UniqueConstraint(columnNames ={"permission_id","user_id"})})
    @JsonIgnoreProperties("userPermissions")
    private List<User> permissionUsers;

    public Permission(){
    }

    public String getName() {
        return name;
    }

    public List<User> getPermissionUsers() {
        return permissionUsers;
    }

    public Long getId() {
        return id;
    }

    public void setName(String administrator) {
        this.name = administrator;
    }

    public void setPermissionUsers(List<User> users) {
        this.permissionUsers = users;
    }
}
