package cz.osu.model.entity;

// import cz.osu.model.exclude.AccountRole;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 64)
    private String userName;

    @Column(length = 255)
    @JsonIgnore
    private String passwordHash;

    @Column(length = 255)
    private String email;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name="user_permission", joinColumns = @JoinColumn(name="user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="permission_id", referencedColumnName = "id"),
            uniqueConstraints = {@UniqueConstraint(columnNames={"user_id","permission_id"})})
    @JsonIgnoreProperties("permissionUsers")
    private List<Permission> userPermissions;

    public User(){

    }

    public List<Permission> getUserPermissions() {
        return this.userPermissions;
    }

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUserPermissions(List<Permission> permissions) {
        this.userPermissions = permissions;
    }

}
