import { ArrowLeftOutlined, DeleteOutlined, ExclamationCircleOutlined, SaveOutlined } from "@ant-design/icons/lib/icons";
import { Select, Form, Input, Button, message, Row, Col, Checkbox } from "antd";
import confirm from "antd/lib/modal/confirm";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import documents from "../../services/documents/documents";
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

    const onUnitChange = async (value) => {
        const response = await units.getUnitById(value[0]);
        if (response) {
            setUnit(response);
        }
    }

    const options = unitsList.map((unit) => (
        <Option key={[unit.id, unit.number, unit.name]} >{unit.number} - {unit.name}</Option>
    ))

    const onFinish = (values) => {
        values.employeeUnit = unit;
        employees.editEmployee(values, employee.id)
            .then((res) => {
                if (res === true) {
                    console.log("true", res)
                    message.success("Zam??stnance se poda??ilo upravit")
                } else {
                    message.error(res)
                }
            });
    }

    function showDeleteConfirmDocument(id) {
        confirm({
            title: 'Pozor',
            icon: <ExclamationCircleOutlined />,
            content: 'Ur??it?? chcete smazat dokument?',
            okText: 'Ano',
            okType: 'danger',
            cancelText: 'Ne',
            onOk() {
                documents.deleteDocument(id)
                    .then((res) => {
                        if (res === true) {
                            console.log("smaz??no")
                            message.success("Dokument se poda??ilo smazat")
                        } else {
                            console.log("nepoda??ilo se", res)
                            message.warning("Dokument se nepoda??ilo smazat")
                        }
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    function showDeleteConfirmEmlpoyee() {
        confirm({
            title: 'Pozor',
            icon: <ExclamationCircleOutlined />,
            content: 'Ur??it?? chcete smazat zam??stnance ' + employee.name + ' ' + employee.surname + '?',
            okText: 'Ano',
            okType: 'danger',
            cancelText: 'Ne',
            onOk() {
                employees.deleteEmployee(employee.id)
                    .then((res) => {
                        if (res === true) {
                            console.log("smaz??no")
                            window.location.replace('/home')
                        } else {
                            console.log("nepoda??ilo se", res)
                        }
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
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
                    layout="horizontal"
                    size="large"
                    initialValues={{
                        'name': employee.name,
                        'surname': employee.surname,
                        'birthNumber': employee.birthNumber
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item name="name" label="Jm??no" rules={[{ required: true, message: "Je pot??eba vyplnit jm??no zam??stnance" }]}>
                        <Input style={{ width: '25%' }} onChange={e => form.setFieldsValue({ employeeName: e.target.value })} />
                    </Form.Item>
                    <Form.Item name="surname" label="P????jmen??" rules={[{ required: true, message: "Je pot??eba vyplnit p????jmen?? zam??stnance" }]}>
                        <Input style={{ width: '25%' }} onChange={e => form.setFieldsValue({ employeeSurname: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="St??edisko">
                        {isUnitsLoading ?
                            (
                                <Select>

                                </Select>
                            ) : (
                                <Select
                                    style={{ width: '25%' }}
                                    placeholder={employee.unitForEmployee ? (employee.unitForEmployee.number + " - " + employee.unitForEmployee.name) : ("Vyberte st??edisko")}
                                    showSearch
                                    filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={onUnitChange}
                                >
                                    {options}
                                </Select>
                            )}
                    </Form.Item>
                    <Form.Item name="birthNumber" label="Rodn?? ????slo" rules={[{ required: true, message: "Je pot??eba vyplnit rodn?? ????slo zam??stnance" }]}>
                        <Input style={{ width: '25%' }} onChange={e => form.setFieldsValue({ employeeBirthNumber: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Ulo??en?? soubory:">
                        {employee.documentsForEmployee.map((item) => (
                            <Row id="documentItem" style={{ alignItems: 'center', margin: '0 0 0.8rem 0.2rem' }} key={item.id}>
                                <Col span={4} style={{ fontWeight: 'bold' }}>{item.originalName}</Col>
                                <Col span={8}>
                                    <Select defaultValue={item.type.name} style={{ width: '80%' }}></Select>
                                </Col>
                                <Col span={6}>
                                    <Checkbox>Soubor v r??mci projektu</Checkbox>
                                </Col>
                                <Col span={4} offset={2}>
                                    <Button danger onClick={() => showDeleteConfirmDocument(item.id)} icon={<DeleteOutlined />} size="small">Odstranit</Button>
                                </Col>
                            </Row>
                        ))}
                    </Form.Item>
                    <AddDocument employeeId={params.id} />
                    <Row style={{ marginTop: '1rem', alignItems: 'center' }}>
                        <Col offset={16}>
                            <Button danger type="dashed" icon={<DeleteOutlined />} size="middle" style={{ padding: '0 0.5rem' }} onClick={showDeleteConfirmEmlpoyee}>Odstranit</Button>
                        </Col>
                        <Col offset={3}>
                            <Button type="primary" htmlType="submit" size="large" icon={<SaveOutlined />} style={{ padding: '0 2.5rem' }}>Ulo??it</Button>
                        </Col>

                    </Row>
                </Form>
            </div>
        )
    )
}