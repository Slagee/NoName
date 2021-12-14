import { Select, Form, Input, Button, message } from "antd";
import { Navigate } from "react-router-dom";
import employees from "../../services/employees/employees";
import './CreateEmployee.css'

export default function CreateEmployee() {
    const [form] = Form.useForm();
    let user = localStorage.getItem("username");
    if (!user) {
        return <Navigate to="/" />
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
                <Form.Item wrapperCol={{offset: 12}}>
                    <Button className="createEmployeeBtn" type="primary" htmlType="submit" size="large">Uložit</Button>
                </Form.Item>
            </Form>
            
        </div>
        
    )
}