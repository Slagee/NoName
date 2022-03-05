import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Row, Card, Col } from 'antd';
import './UserRegistration.css'
import { LockOutlined, MailOutlined} from "@ant-design/icons/lib/icons";
import { useForm } from "antd/lib/form/Form";

export default function UserRegistration() {
  const [form] = useForm();
  const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

return (
  <Row gutter={16}>
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
      rules={[{required: true, message: 'Vyplňte heslo! Hesla se neshodují! ',},]}
    >
      <Input.Password onChange={e => form.setFieldsValue(e.target.value)} prefix={<LockOutlined className="site-form-item-icon" />}/>
    </Form.Item>

    <Form.Item
      wrapperCol={{offset: 10, span: 6,}}
    >
    <Button type="primary" htmlType="submit">
      Registrovat
    </Button>
  </Form.Item>

</Form>
</Card>
</Col>
</Row>
);
};