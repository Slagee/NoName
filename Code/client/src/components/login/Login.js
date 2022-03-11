import { Input, Form, Button, Card, Row } from "antd";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import authenticationService from '../../services/authentication/authentication';
import './Login.css';
import { LockOutlined, UserOutlined,LoginOutlined } from "@ant-design/icons/lib/icons";
import { useForm } from "antd/lib/form/Form";

export default function Login({ setToken })
{
    const [form] = useForm();
    const [redirect, setRedirect] = useState(false);

    const onFinish = async (values) => {
        await authenticationService.login(values).then((res) => {
            if (res === "") {
                setRedirect(false)
            } else {
                localStorage.setItem("username", form.getFieldValue("username"))
                setToken(res);
                setRedirect(true)
            }
            
        }).catch((error) => {
            console.log(error);
    });
    }

    if (redirect === true) {
        return <Navigate to="/home" />
    }
    return(
        <div className="login-wrapper">
           <Card title="Přihlášení">
                <Form
                    form={form}
                    name="login"
                    labelCol={{ span: 10 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Uživatelské jméno"
                        name="username"
                        rules={[{ required: true, message: 'Vyplňte uživatelské jméno!' }]}
                    >
                        <Input onChange={e => form.setFieldsValue(e.target.value)} prefix={<UserOutlined className="site-form-item-icon" />}/>
                    </Form.Item>

                    <Form.Item
                        label="Heslo"
                        name="password"
                        rules={[{ required: true, message: 'Vyplňte heslo!' }]}
                    >
                        <Input.Password onChange={e => form.setFieldsValue(e.target.value)} prefix={<LockOutlined className="site-form-item-icon" />}/>
                    </Form.Item>

                    <Form.Item>
                        <Row justify="space-around" align="middle">
                            <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>
                                Přihlásit se
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}