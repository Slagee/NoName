import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Row, Card, Col , Select} from 'antd';
import authenticationService from '../../services/authentication/authentication';
import './UserRegistration.css'
import { LockOutlined, MailOutlined, PlusCircleOutlined} from "@ant-design/icons/lib/icons";
import { useForm } from "antd/lib/form/Form";
import { ArrowLeftOutlined } from "@ant-design/icons/lib/icons";

export default function UserRegistration() {
  const { Option } = Select;
  const [form] = useForm();
  const onFinish = async (values) => {
    await authenticationService.register(values).then((res) => {
        if (res === "") {
            alert("Registrace neúspěšná.");
        } else {
            alert("Úspěšná registrace, můžete se přihlásit.");
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
      labelCol={{span: 8,}}
      wrapperCol={{span: 12}}
      initialValues={{ remember: true,}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      >
    <Form.Item
      label="E-mail"
      name="e-mail"
      rules={[{required: true, message: 'Prosím zadejte e-mail!',},]}
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
      label="Role"
      name="permissionName"
      rules={[{required: true, message: 'Vyberte roli!'}]}>
      <Select
          placeholder="Vyberte roli pro zaměstnance"
          allowClear
        >
          <Option value="ROLE_ADMIN">Administrátor</Option>
          <Option value="ROLE_ACCOUNTANT">Účetní</Option>
          <Option value="ROLE_HR">Human Resources</Option>
        </Select>    
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