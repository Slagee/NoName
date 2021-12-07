import React, { useState } from "react";
import authenticationService from "../../services/authentication/authentication.service";
import { Input, Form, Button, Card } from "antd";

export default function NewLogin() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const onFinish = async () => {
        await authenticationService.login(
            username,
            password
        ).then( () => {
            this.props.history.push('/home');
            window.location.reload();
        },
        error => {
            console.log(error)
        })
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

                    <Form.Item wrapperCol={{ offset: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Přihlásit se
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}