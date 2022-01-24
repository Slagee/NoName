import { ArrowLeftOutlined } from "@ant-design/icons/lib/icons";
import { Select, Form, Input, Button, message, Row, InputNumber } from "antd";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import employees from "../../services/employees/employees";
import { GetUnitsList } from "../../services/units/GetUnitsList";
import units from "../../services/units/units";
import './CreateEmployee.css'

const { Option } = Select;

export default function CreateEmployee() {
    const [form] = Form.useForm();
    const [unit, setUnit] = useState(null);
    const [unitsList, isLoading] = GetUnitsList();

    let user = localStorage.getItem("username");
    if (!user) {
        return <Navigate to="/login" />
    }

    const onUnitChange = async (value) => {
        const response = await units.getUnitById(value[0]);
        if (response) {
            setUnit(response);
        }
    }

    const options = unitsList.map((unit) => (
        <Option key={[unit.id, unit.number, unit.name]}>{unit.number} - {unit.name}</Option>
    ))

    const onFinish = (values) => {
        values.employeeUnit = unit;
        employees.createEmployee(values)
            .then((res) => {
                if (res === true) {
                    message.success("Zaměstnance se podařilo vytvořit")
                } else {
                    message.error(res)
                }
            });
    }

    return (
        <div className="employeeContent">
            <Row style={{ 'marginBottom': "2rem" }}>
                <ArrowLeftOutlined className="backArrow" style={{ fontSize: '2rem' }} onClick={() => window.history.back()} />
            </Row>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                layout="horizontal"
                size="large"
                onFinish={onFinish}
            >
                <Form.Item name="name" label="Jméno" rules={[{ required: true, message: "Je potřeba vyplnit jméno zaměstnance" }]}>
                    <Input style={{ width: '35%' }} onChange={e => form.setFieldsValue({ employeeName: e.target.value })} />
                </Form.Item>
                <Form.Item name="surname" label="Příjmení" rules={[{ required: true, message: "Je potřeba vyplnit příjmení zaměstnance" }]}>
                    <Input style={{ width: '35%' }} onChange={e => form.setFieldsValue({ employeeSurname: e.target.value })} />
                </Form.Item>
                <Form.Item name="unit" label="Středisko" rules={[{ required: true, message: "Je potřeba vyplnit středisko zaměstnance" }]}>
                    {isLoading ?
                        (
                            <Select>

                            </Select>
                        ) : (
                            <Select
                                style={{ width: '35%' }}
                                showSearch
                                placeholder="Středisko"
                                filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={onUnitChange}
                            >
                                {options}
                            </Select>
                        )}
                </Form.Item>
                <Form.Item name="birthNumber" label="Rodné číslo" rules={[{ required: true, message: "Je potřeba vyplnit rodné číslo zaměstnance" }]}>
                    <InputNumber type="number" style={{ width: '35%' }} onChange={e => form.setFieldsValue({ employeeBirthNumber: e })} />
                </Form.Item>
                <Form.Item>
                    <Button className="createEmployeeBtn" type="primary" htmlType="submit" size="large">Uložit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}