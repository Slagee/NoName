import { Table } from "antd";
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
const { Search } = Input;

export default function ListOfCenters() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [searchCenters, setSearchCenters] = useState(null);
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCenters, setEditingCenters] = useState(null);

  const [unitList, setUnitList] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await units.getUnits();
      if (response) {
        setUnitList(response);
      }
    })();
  }, []);

  const { confirm } = Modal;

  function showEdit(unit) {
    confirm({
      title: "Úprava Střediska",
      okText: "Uložit",
      cancelText: "Zrušit",
      onOk() {
        console.log("OK editing");
      },
      content: (
        <div>
          <Input type="number" defaultValue={unit.number} onChange={e => unit.number = e.target.value} />
          <Input defaultValue={unit.name} onChange={e => unit.name = e.target.value} />
        </div>
      ),
    });
  }

  const columns = [
    {
      title: "Číslo",
      dataIndex: "number",
      width: '10%',
    },
    {
      title: "Středisko",
      dataIndex: "name",
    },
    {
      title: "",
      dataIndex: "",
      render: (text, record) => (
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
      render: () => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => console.log("delete")}
        >
          Odstranit
        </Button>
      ),
      width: '20%',
      align: "center",
    },
  ];

  const onAddCenter = () => {
    console.log("add unit");
  };

  const onDeleteCenter = (record) => {
    Modal.confirm({
      title: "Opravdu chcete středisko smazat?",
      okText: "ANO",
      okType: "danger",
      cancelText: "NE",
      onOk: () => {
        console.log("OK");
      },
    });
  };

  const onEditCenter = (record) => {
    setSelectedUnit(record);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingCenters(null);
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
