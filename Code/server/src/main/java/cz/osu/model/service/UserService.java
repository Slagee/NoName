package cz.osu.model.service;

import cz.osu.model.entity.Employee;
import cz.osu.model.entity.EmployeeCreateDto;
import cz.osu.security.account.UserDto;
import cz.osu.model.entity.Permission;
import cz.osu.model.entity.User;
import cz.osu.model.repository.PermissionRepository;
import cz.osu.model.repository.UserRepository;
import cz.osu.security.account.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> list(){
        return userRepository.findAll();
    }

    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }


    public User registerNewUserAccount(UserDto userDto) {

        // checking if user exists
        boolean userExists = userRepository.findByUserName(userDto.getUserName()).isPresent();

        if(userExists){
            throw new IllegalStateException("User already exists");
        }

        User user = new User();
        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getUserName());
        user.setPasswordHash(passwordEncoder.encode(userDto.getPassword()));
        List<String> permissionsNames = userDto.getPermissionNames();
        List<Permission> permissionsFound = permissionRepository.findByNameIn(permissionsNames);

        user.setUserPermissions(permissionsFound);

        return userRepository.save(user);
    }

    public User updateUser(Long permissionId, Long id) {
        Optional<User> userExists = userRepository.findById(id);
        if (userExists.isEmpty()) {
            throw new IllegalStateException("Vybraného uživatele se nepodařilo najít");
        }
        User user = userExists.get();
        Permission permissionsFound = permissionRepository.findFirstById(permissionId);
        System.out.println(permissionsFound.getName());
        List<Permission> userPermissions = user.getUserPermissions();

        for (Permission userPermission : userPermissions) {
            if (userPermission.getId().equals(permissionId)) {
                user.removeUserPermission(permissionsFound);
                System.out.println("odebrano");
                return userRepository.save(user);
            }
        }

        user.addUserPermission(permissionsFound);
        System.out.println("pridano");
        return userRepository.save(user);
    }

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUserName(userName);
        user.orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user.map(MyUserDetails::new).get();
    }

    private static List<GrantedAuthority> getAuthorities (List<String> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String role : roles) {
            authorities.add(new SimpleGrantedAuthority(role));
        }
        return authorities;
    }

    public void addUser(User user){
       userRepository.save(user);
    }

    public Page<User> loadPage(Specification<User> userSpec, Pageable pageable) {
        return userRepository.findAll(userSpec, pageable);
    }
}
