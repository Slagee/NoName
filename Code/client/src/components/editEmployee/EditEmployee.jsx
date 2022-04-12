import {
  ArrowLeftOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SaveOutlined,
  InboxOutlined,
} from "@ant-design/icons/lib/icons";
import { Select, Form, Input, Button, message, Row, Col, Checkbox } from "antd";
import confirm from "antd/lib/modal/confirm";
import Dragger from "antd/lib/upload/Dragger";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import documents from "../../services/documents/documents";
import { GetDocumentTypeList } from "../../services/documentType/GetDocumentTypeList";
import employees from "../../services/employees/employees";
import { GetUnitsList } from "../../services/units/GetUnitsList";
import units from "../../services/units/units";
import { GetEmployeeById } from "../home/GetEmployeeById";
import "./EditEmployee.css";

const { Option } = Select;

export default function EditEmployee() {
  const [form] = Form.useForm();
  const params = useParams();
  const [unit, setUnit] = useState(null);
  const [unitsList, updateUnits] = GetUnitsList();
  const [documentType, isDocumentTypeLoading] = GetDocumentTypeList();
  const [employee, updateEmployee, isLoading] = GetEmployeeById(params.id);

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

  let unitsSelect;
  let user = localStorage.getItem("username");
  if (!user) {
    return <Navigate to="/login" />;
  }

  const onUnitChange = async (value) => {
    const response = await units.getUnitById(value[0]);
    if (response) {
      setUnit(response);
    }
  };

  const unitsOptions = unitsList.map((unit) => (
    <Option key={[unit.id, unit.number, unit.name]}>
      {unit.number} - {unit.name}
    </Option>
  ));

  const documentTypeOptions = documentType.map((documentType) => (
    <Option key={documentType.id}>
      {documentType.name}
    </Option>
  ));

  const onFinish = (values) => {
    values.employeeUnit = unit;
    employees.editEmployee(values, employee.id).then((res) => {
      if (res === true) {
        console.log("true", res);
        message.success("Zaměstnance se podařilo upravit");
      } else {
        message.error(res);
      }
    });
  };
 
  
    unitsSelect = (
      <Select
        style={{ width: "35%" }}
        placeholder={
          employee.unitForEmployee
            ? employee.unitForEmployee.number +
              " - " +
              employee.unitForEmployee.name
            : "Vyberte středisko"
        }
        showSearch
        filterOption={(input, option) =>
          option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={onUnitChange}
      >
        {unitsOptions}
      </Select>
    );
  

  const documentTypeSelect = (document) => {
    if (isDocumentTypeLoading)
      return <Select></Select>
    else {
      return (
      <Select
      style={{ width: "75%" }}
      defaultValue={document.type.name}
      onChange={(value) => console.log(value)}
    >
      {documentTypeOptions}
    </Select>
      )
    }
  }

  function showDeleteConfirmDocument(id) {
    confirm({
      title: "Pozor",
      icon: <ExclamationCircleOutlined />,
      content: "Určitě chcete smazat dokument?",
      okText: "Ano",
      okType: "danger",
      cancelText: "Ne",
      async onOk() {
        const response = await documents.deleteDocument(id);
        if (response) {
          message.success("Dokument se podařilo smazat");
          const refresh = await employees.getEmployeeById(params.id);
          if (refresh) updateEmployee(refresh);
        } else {
          message.warning("Dokument se nepodařilo smazat");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  function showDeleteConfirmEmlpoyee() {
    confirm({
      title: "Pozor",
      icon: <ExclamationCircleOutlined />,
      content:
        "Určitě chcete smazat zaměstnance " +
        employee.name +
        " " +
        employee.surname +
        "?",
      okText: "Ano",
      okType: "danger",
      cancelText: "Ne",
      onOk() {
        employees.deleteEmployee(employee.id).then((res) => {
          if (res === true) {
            console.log("smazáno");
            window.location.replace("/home");
          } else {
            console.log("nepodařilo se", res);
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const draggerProps = {
    name: "file",
    multiple: false,
    accept: ".pdf",
    showUploadList: false,
    action: async (param) => {
      const formData = new FormData();
      const json = {
        releaseDate: Date.now(),
        validityDate: "2023-01-01T22:00:00.000+00:00",
        employeeForDocument: {
          id: employee.id,
        },
        type: {
          id: 1,
        },
      };
      const x = JSON.stringify(json);
      const blob = new Blob([x], {
        type: "application/json",
      });
      const file = param;

      formData.append("document", blob);
      formData.append("file", file);

      const response = await documents.createDocument(formData);
      if (response) {
        message.success("Dokument byl úspěšně odeslán");
        const refresh = await employees.getEmployeeById(params.id);
        if (refresh) updateEmployee(refresh);
      } else {
        message.error(response);
      }
    },
  };

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <Row justify="center">
      <Col span={18}>
        <Row style={{ marginBottom: "2rem" }}>
          <ArrowLeftOutlined
            className="backArrow"
            style={{ fontSize: "2rem" }}
            onClick={() => window.history.back()}
          />
        </Row>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          layout="horizontal"
          size="large"
          initialValues={{
            name: employee.name,
            surname: employee.surname,
            birthNumber: employee.birthNumber,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Jméno"
            rules={[
              {
                required: true,
                message: "Je potřeba vyplnit jméno zaměstnance",
              },
            ]}
          >
            <Input
              style={{ width: "35%" }}
              onChange={(e) =>
                form.setFieldsValue({ employeeName: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="surname"
            label="Příjmení"
            rules={[
              {
                required: true,
                message: "Je potřeba vyplnit příjmení zaměstnance",
              },
            ]}
          >
            <Input
              style={{ width: "35%" }}
              onChange={(e) =>
                form.setFieldsValue({ employeeSurname: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Středisko">{unitsSelect}</Form.Item>
          <Form.Item
            name="birthNumber"
            label="Rodné číslo"
            rules={[
              {
                required: true,
                message: "Je potřeba vyplnit rodné číslo zaměstnance",
              },
            ]}
          >
            <Input
              style={{ width: "35%" }}
              onChange={(e) =>
                form.setFieldsValue({ employeeBirthNumber: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Uložené soubory:">
            {employee.documentsForEmployee.map((item) => (
              <Row
                id="documentItem"
                style={{ alignItems: "center", margin: "0 0 0.8rem 0.2rem" }}
                key={item.id}
              >
                <Col span={4} style={{ fontWeight: "bold" }}>
                  {item.originalName}
                </Col>
                <Col span={8}>
                  {documentTypeSelect(item)}
                </Col>
                <Col span={8}>
                  <Checkbox>Soubor v rámci projektu</Checkbox>
                </Col>
                <Col span={4}>
                  <Button
                    danger
                    onClick={() => showDeleteConfirmDocument(item.id)}
                    icon={<DeleteOutlined />}
                    size="small"
                  >
                    Odstranit
                  </Button>
                </Col>
              </Row>
            ))}
          </Form.Item>
          <Row justify="center">
            <Col span={22}>
              <Dragger {...draggerProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Klikněte nebo přetáhněte dokument sem pro nahrání
                </p>
              </Dragger>
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem", alignItems: "center" }}>
            <Col offset={16}>
              <Button
                danger
                type="dashed"
                icon={<DeleteOutlined />}
                size="middle"
                onClick={showDeleteConfirmEmlpoyee}
              >
                Odstranit
              </Button>
            </Col>
            <Col offset={2}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SaveOutlined />}
                style={{ padding: "0 2.5rem" }}
              >
                Uložit
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
