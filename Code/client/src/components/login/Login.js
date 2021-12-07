import './Login.css';
import { Input, Form, Button, Card } from "antd";
import React, { useState } from "react";
import PropTypes from 'prop-types';

async function loginUser(credentials)
{
    return fetch('login',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(res => res)
    .catch((err) => {
        console.log(err);
    });
}

export default function Login({ setToken })
{
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const onFinish = async () => {
        await loginUser({
            username,
            password
        }).then(res => {
            if (res.ok) {
                setToken(res);
                localStorage.setItem('user', username);
                console.log(res);
            } else {
                console.log(res);
            }
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed: ", errorInfo);
    }

    return(
        <div className="login-wrapper">
           <Card title="Přihlášení">
                <Form
                    name="login"
                    labelCol={{ span: 10 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Uživatelské jméno"
                        name="username"
                        rules={[{ required: true, message: 'Vyplňte uživatelské jméno!' }]}
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

                    <Form.Item wrapperCol={{ offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Přihlásit se
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}