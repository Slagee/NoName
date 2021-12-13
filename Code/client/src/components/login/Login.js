import './Login.css';
import { Input, Form, Button, Card } from "antd";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import authenticationService from '../../services/authentication/authentication';

export default function Login({ setToken })
{
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [redirect, setRedirect] = useState(false);

    const onFinish = async () => {
        await authenticationService.login({
            username,
            password
        }).then((res) => {
            if (res === "") {
                setRedirect(false)
            } else {
                setRedirect(true)
            }
            setToken(res);
        }).catch((error) => {
            console.log(error);
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed: ", errorInfo);
    }

    if (redirect === true) {
        return <Navigate to="/home" />
    }
    return(
        <div className="login-wrapper" style={{ padding: '25px 100px' }}>
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