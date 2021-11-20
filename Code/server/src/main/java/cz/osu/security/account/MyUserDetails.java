package cz.osu.security.account;

import cz.osu.model.entity.Permission;
import cz.osu.model.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class MyUserDetails implements UserDetails {

    private final String userName;
    private final String passwordHash;
    private final List<GrantedAuthority> permissionsList;

    public MyUserDetails(User user) {
        this.userName = user.getUserName();
        this.passwordHash = user.getPasswordHash();
        this.permissionsList = parseUserPermissions(user);
    }

    private List<GrantedAuthority> parseUserPermissions(User user){

        List<GrantedAuthority> userPermissions = new ArrayList<>();

        for (Permission permission : user.getUserPermissions()) {
            userPermissions.add(new SimpleGrantedAuthority(permission.getName()));
        }

        return userPermissions;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return permissionsList;
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
