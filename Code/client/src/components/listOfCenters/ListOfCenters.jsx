import { InputNumber, message, Table } from "antd";
import { Form, Input, Button, Row, Col, Modal } from "antd";
import "./ListOfCenters.css";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons/lib/icons";
import units from "../../services/units/units";
import { GetUnitsList } from "../../services/units/GetUnitsList";
const { Search } = Input;

export default function ListOfCenters() {
  const [formCreate] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [unitList, updateUnits] = GetUnitsList();

  const { confirm } = Modal;

  function showEdit() {
    confirm({
      width: "30rem",
      title: "Úprava Střediska",
      okText: "Uložit",
      cancelText: "Zrušit",
      onOk: async () => {
        if (await formEdit.validateFields()) {
          formEdit.submit();
        }
      },
      content: (
        <div>
          <Form
            form={formEdit}
            onFinish={handleEdit}
            autoComplete="off"
            labelCol={{ span: 8 }}
          >
            <Form.Item name="id" style={{display: "none"}} />
            <Form.Item
              label="Číslo střediska"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Číslo střediska je potřeba vyplnit",
                },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              label="Název střediska"
              name="name"
              rules={[{ required: true, message: "Jméno je potřeba vyplnit" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      ),
    });
  }

  const handleEdit = async (values) => {
    var unit = {number: values.number, name: values.name}
    var response = await units.editUnit(unit, values.id);
    if (response.ok) {
      message.success("Středisko se podařilo upravit");
    } else message.error(await response.text());
    await updateUnits();
  };

  const columns = [
    {
      title: "Číslo",
      dataIndex: "number",
      width: "10%",
      align: "center",
    },
    {
      title: "Středisko",
      dataIndex: "name",
    },
    {
      title: "",
      dataIndex: "",
      render: (record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => {
            formEdit.setFieldsValue(record);
            showEdit(record.id);
          }}
        >
          Upravit
        </Button>
      ),
      width: "20%",
      align: "center",
    },
    {
      title: "",
      dataIndex: "",
      render: (record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDeleteCenter(record)}
        >
          Odstranit
        </Button>
      ),
      width: "20%",
      align: "center",
    },
  ];

  const handleCreate = async (unit) => {
    var response = await units.createUnit(unit);
    if (response.ok) {
      message.success("Středisko se podařilo vytvořit");
      formCreate.resetFields();
    } else message.error(await response.text());
    await updateUnits();
  };

  const onAddCenter = () => {
    confirm({
      width: "30rem",
      title: "Přidat Středisko",
      okText: "Uložit",
      cancelText: "Zrušit",
      onOk: async () => {
        if (await formCreate.validateFields()) formCreate.submit();
      },
      content: (
        <div>
          <Form
            form={formCreate}
            onFinish={handleCreate}
            autoComplete="off"
            labelCol={{ span: 8 }}
          >
            <Form.Item
              label="Číslo střediska"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Číslo střediska je potřeba vyplnit",
                },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              label="Název střediska"
              name="name"
              rules={[{ required: true, message: "Jméno je potřeba vyplnit" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      ),
    });
  };

  const onDeleteCenter = (record) => {
    var title = (<div>Opravdu chcete středisko <span style={{fontWeight: "bold"}}>{record.name}</span> smazat?</div>)
    confirm({
      width: "30rem",
      title: title,
      okText: "ANO",
      okType: "danger",
      cancelText: "NE",
      onOk: async () => {
        var response = await units.deleteUnit(record.id);
        message.success(response);
        await updateUnits();
      },
    });
  };

  return (
    <div className="Centers-Table">
      <Row justify="center">
        <Col span={8}>
          <ArrowLeftOutlined
            className="backArrow"
            style={{ fontSize: "2rem" }}
            onClick={() => window.history.back()}
          />
        </Col>
        <Col span={8}>
          <Search
            placeholder="Vyhledej středisko"
            enterButton
            style={{ width: 300, float: "right", paddingBottom: "25px" }}
          />
        </Col>
      </Row>

      <Row justify="center">
        <Col span={16}>
          <Table dataSource={unitList} columns={columns} rowKey="id"></Table>
        </Col>
      </Row>

      <Form.Item>
        <Row justify="end">
          <Col span={8}>
            <Button
              type="primary"
              className="SaveButton"
              htmlType="submit"
              icon={<PlusCircleOutlined />}
              onClick={onAddCenter}
            >
              Přidat středisko
            </Button>
          </Col>
          <Col span={4} />
        </Row>
      </Form.Item>
    </div>
  );
}
