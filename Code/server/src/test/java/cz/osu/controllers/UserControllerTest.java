package cz.osu.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import cz.osu.security.account.UserDto;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.LinkedList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@WebMvcTest(UserController.class)
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)

class UserControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;
    ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private UserController userController;

    @Test
    void registerUserAccount() throws Exception {
        String uri = "/user/registration";
        UserDto userDto = new UserDto();
        userDto.setUserName("testUser");
        userDto.setPassword("1234");
        List<String> permissions = new LinkedList<>();
        permissions.add("ROLE_ACCOUNTANT");
        userDto.setPermissionNames(permissions);

        assertNotNull(userDto);
        MockMvc mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        mvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().is(200));
    }
}