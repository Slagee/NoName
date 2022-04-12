import { message, Table } from "antd";
import { Form, Input, Button, Row, Col, Modal } from "antd";
import "./ListOfCenters.css";
import { useEffect, useState } from "react";
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
  const [searchCenters, setSearchCenters] = useState(null);
  const [page, setPage] = useState(1);

  const [unitList, updateUnits] = GetUnitsList();

  const { confirm } = Modal;

  function showEdit(unit) {
    confirm({
      title: "Úprava Střediska",
      okText: "Uložit",
      cancelText: "Zrušit",
      onOk: async () => {
        var response = await units.editUnit(unit, unit.id);
        if (response.ok)
          message.success("Středisko se podařilo upravit");
        else
          message.error(await response.text())
        await updateUnits();
      },
      content: (
        <div>
          <Row gutter={[8, 12]} align="middle">
            <Col span={8}>
              Číslo střediska
            </Col>
            <Col span={16}>
              <Input type="number" defaultValue={unit.number} onChange={e => unit.number = e.target.value} />
            </Col>
            <Col span={8}>
              Název střediska
            </Col>
            <Col span={16}>
              <Input defaultValue={unit.name} onChange={e => unit.name = e.target.value} />
            </Col>
          </Row>
        </div>
      ),
    });
  }

  const columns = [
    {
      title: "Číslo",
      dataIndex: "number",
      width: '10%',
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
          onClick={() => showEdit(record)}
        >
          Upravit
        </Button>
      ),
      width: '20%',
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
      width: '20%',
      align: "center",
    },
  ];

  const onAddCenter = () => {
    var unit = {number: "0", name: ""};
    confirm({
      title: "Přidat Středisko",
      okText: "Uložit",
      cancelText: "Zrušit",
      onOk: async () => {
        var response = await units.createUnit(unit);
        if (response.ok)
          message.success("Středisko se podařilo vytvořit");
        else
          message.error(await response.text())
        await updateUnits();
      },
      content: (
        <div>
          <Row gutter={[8, 12]} align="middle">
            <Col span={8}>
              Číslo střediska
            </Col>
            <Col span={16}>
              <Input type="number" onChange={e => unit.number = e.target.value} />
            </Col>
            <Col span={8}>
              Název střediska
            </Col>
            <Col span={16}>
              <Input onChange={e => unit.name = e.target.value} />
            </Col>
          </Row>
        </div>
      ),
    });
  };

  const onDeleteCenter = (record) => {
    confirm({
      title: "Opravdu chcete středisko "+record.name+" smazat?",
      okText: "ANO",
      okType: "danger",
      cancelText: "NE",
      onOk: async () => {
        var response = await units.deleteUnit(record.id)
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
            onChange={(e) => setSearchCenters(e.target.value)}
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
