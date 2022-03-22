import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Row, Card, Col , Checkbox} from 'antd';
import authenticationService from '../../services/authentication/authentication';
import './UserRegistration.css';
import { Navigate } from "react-router-dom";
import { LockOutlined, MailOutlined, PlusCircleOutlined} from "@ant-design/icons/lib/icons";
import { useForm } from "antd/lib/form/Form";
import { ArrowLeftOutlined } from "@ant-design/icons/lib/icons";

export default function UserRegistration() {
  const [form] = useForm();

  let user = localStorage.getItem("username");
    if (!user) {
        return <Navigate to="/login" />
    }
  
  const onFinish = async (values) => {
    await authenticationService.register(values).then((res) => {
        if (res === "") {
            console.log("Registrace neúspěšná.");
        } else {
            console.log("Registrace úspěšná");
        }
        
    }).catch((error) => {
        console.log(error);
});
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

return (
  <Row gutter={20}>
  <ArrowLeftOutlined className="backArrow" style={{ fontSize: '2rem' }} onClick={() => window.history.back()} />
  <Col span={8} offset={8}> 
  <Card title = "Registrace uživatele">
    <Form className='Register-form'
      name="Register-form"
      form={form}
      labelCol={{span: 8,}}
      wrapperCol={{span: 12}}
      initialValues={{ remember: true,}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      >
    <Form.Item
      label="E-mail"
      name="userName"
      rules={[{type: "email", required: true, message: 'Prosím zadejte e-mail!',},]}
    >
      <Input onChange={e => form.setFieldsValue(e.target.value)} prefix={<MailOutlined className="site-form-item-icon" />}/>
    </Form.Item>

    <Form.Item 
      label="Heslo" 
      name="password"
      rules={[{required: true, message: 'Vyplňte heslo! ',},]}
    >
      <Input.Password onChange={e => form.setFieldsValue(e.target.value)} prefix={<LockOutlined className="site-form-item-icon" />}/>
    </Form.Item>

    <Form.Item 
      label="Heslo znovu"
      name="againpassword"
      rules={[{required: true, message: 'Vyplňte heslo! Hesla se neshodují!'}]}
    >
      <Input.Password onChange={e => form.setFieldsValue(e.target.value)} prefix={<LockOutlined className="site-form-item-icon" />}/>
    </Form.Item> 

    <Form.Item 
    name="permissionNames" 
    label="Role zaměstnance"
    rules={[{required: true, message: 'Vyplňte roli zaměstnance!'}]}
    >
        <Checkbox.Group>
          <Row>
              <Checkbox value="ROLE_ACCOUNTANT" style={{ lineHeight: '32px' }}>
                Mzdový účetní
              </Checkbox>
          </Row>
          <Row>
              <Checkbox value="ROLE_HR" style={{ lineHeight: '32px' }}>
                Personalista
              </Checkbox>
          </Row>
          <Row>
              <Checkbox value="ROLE_ADMIN" style={{ lineHeight: '32px' }}>
                Administrátor
              </Checkbox>
          </Row>
        </Checkbox.Group>
      </Form.Item>

    <Form.Item
      wrapperCol={{offset: 10, span: 6,}}
    >
    <Button type="primary" htmlType="submit" icon={<PlusCircleOutlined />}>
      Registrovat
    </Button>
  </Form.Item>
</Form>
</Card>
</Col>
</Row>
);
};