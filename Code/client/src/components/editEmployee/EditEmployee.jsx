import { ArrowLeftOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons/lib/icons";
import { Select, Form, Input, Button, message, Row, Col } from "antd";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import employees from "../../services/employees/employees";
import { GetUnitsList } from "../../services/units/GetUnitsList";
import units from "../../services/units/units";
import AddDocument from "../addDocument/AddDocument";
import { GetEmployeeById } from "../home/GetEmployeeById";
import './EditEmployee.css'

const { Option } = Select;

export default function EditEmployee() {
    const [form] = Form.useForm();
    const params = useParams();
    const [unit, setUnit] = useState(null);
    const [unitsList, isUnitsLoading] = GetUnitsList();
    const [employee, isLoading] = GetEmployeeById(params.id);

    useEffect(() => {
        (async () => {
            if (employee.unitForEmployee) {
                const response = await units.getUnitById(employee.unitForEmployee.id);
                console.log(response);
                if (response) {
                    setUnit(response);
                }
            }
        })();
    }, [employee]);

    let user = localStorage.getItem("username");
    if (!user) {
        return <Navigate to="/login" />
    }

    const onUnitChange = value => {
        console.log("unit:", unit)
    }

    const options = unitsList.map((unit) => (
        <Option key={[unit.id, unit.number, unit.name]} >{unit.number} - {unit.name}</Option>
    ))

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
        isLoading ? (
            <div>
                Loading
            </div>
        ) : (
            <div className="employeeContent">
                <Row style={{ 'marginBottom': "2rem" }}>
                    <ArrowLeftOutlined className="backArrow" style={{ fontSize: '2rem' }} onClick={() => window.history.back()} />
                </Row>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 8 }}
                    layout="horizontal"
                    size="large"
                    initialValues={{
                        'name': employee.name,
                        'surname': employee.surname,
                        'birthNumber': employee.birthNumber
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item name="name" label="Jméno" rules={[{ required: true, message: "Je potřeba vyplnit jméno zaměstnance" }]}>
                        <Input onChange={e => form.setFieldsValue({ employeeName: e.target.value })} />
                    </Form.Item>
                    <Form.Item name="surname" label="Příjmení" rules={[{ required: true, message: "Je potřeba vyplnit příjmení zaměstnance" }]}>
                        <Input onChange={e => form.setFieldsValue({ employeeSurname: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Středisko">
                        {isUnitsLoading ?
                            (
                                <Select>

                                </Select>
                            ) : (
                                <Select
                                    placeholder={employee.unitForEmployee ? (employee.unitForEmployee.number +" - "+ employee.unitForEmployee.name) : ("Vyberte středisko")}
                                    showSearch
                                    filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={onUnitChange}
                                >
                                    {options}
                                </Select>
                            )}
                    </Form.Item>
                    <Form.Item name="birthNumber" label="Rodné číslo" rules={[{ required: true, message: "Je potřeba vyplnit rodné číslo zaměstnance" }]}>
                        <Input onChange={e => form.setFieldsValue({ employeeBirthNumber: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Uložené soubory:">
                        {employee.documentsForEmployee.map((item) => (
                            <Row id="documentItem" style={{ padding: '0.6rem' }} key={item.id}>{item.originalName}</Row>
                        ))}
                    </Form.Item>
                    <Row style={{ 'marginBottom': "2rem", 'marginTop': "2rem" }} align="middle">
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
    )
}