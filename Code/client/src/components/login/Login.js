import './Login.css';
import { Input, Form, Button } from "antd";
import React, { useState } from "react";
import PropTypes from 'prop-types';

async function loginUser(credentials)
{
    return fetch('login',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Accept': 'text/plain'
        },
        body: JSON.stringify(credentials)
    })
    .then(res => res.text())
    .then(text => console.log(text));
}

export default function Login({ setToken })
{
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const onFinish = (values) => {
        const token = loginUser({
            username,
            password
        });
        setToken(token);
        localStorage.setItem('user', JSON.stringify({username}))
        console.log("Success: ", values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed: ", errorInfo);
    }

    return(
        <div className="login-wrapper">
           
                <Form
                    name="login"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <h1>Přihlášení</h1>
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[{ required: true, message: 'Vyplňte email!' }]}
                    >
                        <Input onChange={e => setUserName(e.target.value)}/>
                    </Form.Item>

                    <Form.Item
                        label="Heslo"
                        name="heslo"
                        rules={[{ required: true, message: 'Vyplňte heslo!' }]}
                    >
                        <Input.Password onChange={e => setPassword(e.target.value)}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Přihlásit se
                        </Button>
                    </Form.Item>
                </Form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}