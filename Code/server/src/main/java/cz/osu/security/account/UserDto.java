package cz.osu.security.account;

import com.sun.istack.NotNull;
import javax.validation.constraints.NotEmpty;
import java.util.List;

public class UserDto {

    @NotNull
    @NotEmpty
    private String userName;

    @NotNull
    @NotEmpty
    private String password;

    @NotNull
    @NotEmpty
    private List<String> permissionNames;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getPermissionNames() {
        return permissionNames;
    }

    public void setPermissionNames(List<String> permissionNames) {
        this.permissionNames = permissionNames;
    }
}
