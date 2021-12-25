import { ArrowLeftOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons/lib/icons";
import { Select, Form, Input, Button, message, Row, Col } from "antd";
import { Navigate } from "react-router-dom";
import employees from "../../services/employees/employees";
import AddDocument from "../addDocument/AddDocument";
import './EditEmployee.css'

export default function CreateEmployee() {
    const [form] = Form.useForm();
    let user = localStorage.getItem("username");
    if (!user) {
        return <Navigate to="/login" />
    }

    const onFinish = (values) => {
        employees.createEmployee(values)
            .then((res) => {
                if (res === true) {
                    console.log("true", res)
                    message.success("Zaměstnance se podařilo vytvořit")
                } else {
                    message.error(res)   
                }
            });
    }

    return (
        <div className="employeeContent">
            <Row style={{'marginBottom': "2rem"}}>
                <ArrowLeftOutlined className="backArrow" style={{fontSize: '2rem'}} onClick={() => window.history.back()}/>
            </Row>            
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
                layout="horizontal"
                size="large"
                onFinish={onFinish}
            >
                <Form.Item name="name" label="Jméno" rules={[{ required: true, message: "Je potřeba vyplnit jméno zaměstnance" }]}>
                    <Input onChange={e => form.setFieldsValue({employeeName: e.target.value})}/>
                </Form.Item>
                <Form.Item name="surname" label="Příjmení" rules={[{ required: true, message:"Je potřeba vyplnit příjmení zaměstnance" }]}>
                    <Input onChange={e => form.setFieldsValue({employeeSurname: e.target.value})}/>
                </Form.Item>
                <Form.Item label="Středisko">
                    <Select>

                    </Select>
                </Form.Item>
                <Form.Item name="birthNumber" label="Rodné číslo" rules={[{ required: true, message:"Je potřeba vyplnit rodné číslo zaměstnance" }]}>
                    <Input onChange={e => form.setFieldsValue({employeeBirthNumber: e.target.value})}/>
                </Form.Item>
                <Row>
                    <Col span={4} offset={2}>Uložené soubory:</Col>
                    <Col className="files" span={6}>
                        <Row>
                            <Col>
                                Soubor1.pdf
                            </Col>
                            <Col offset={3}>
                                <Button danger type="primary" shape="round" icon={<DeleteOutlined />} size='small'>
                                    Stáhnout
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{'marginBottom': "2rem", 'marginTop':"2rem"}} align="middle">
                        <Col offset={2}>
                            <Button type="primary" htmlType="submit" size="large" icon={<SaveOutlined />}>Uložit</Button>
                        </Col>
                        <Col offset={1}>
                            <Button danger type="dashed" htmlType="submit" icon={<DeleteOutlined />} size="small">Odstranit</Button>
                        </Col>
                </Row>
                <AddDocument />
            </Form>
        </div>
        
    )
}