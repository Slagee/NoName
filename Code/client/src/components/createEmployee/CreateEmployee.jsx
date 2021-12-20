import { Select, Form, Input, Button, message } from "antd";
import { Navigate } from "react-router-dom";
import employees from "../../services/employees/employees";
import AddDocument from "../addDocument/addDocument";
import './CreateEmployee.css'
import { GetUnitsList } from "./GetUnitsList";

const { Option } = Select;

export default function CreateEmployee() {
    const [form] = Form.useForm();
    const [units, isLoading] = GetUnitsList();

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
                    {isLoading ? 
                    (
                        <Select>

                        </Select>
                    ) : (
                        <Select
                            showSearch
                            placeholder="Vyberte středisko"
                            filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {units.map((unit) => (
                                <Option key={unit.id}>{unit.number} - {unit.name}</Option>
                            ))}
                        </Select>
                    )}                    
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