import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Modal, Row, Table } from "antd";
import { format } from "date-fns";
import documents from "../../services/documents/documents";
import "./DocumentNotification.css";

export default function DocumentNotification({ notifications, updateNotifications }) {
  const { confirm } = Modal;

  function showConfirm(document) {
    confirm({
      title: "Ukončení notifikace",
      icon: <ExclamationCircleOutlined />,
      content:
        "Tímto berete na vědomí blížící se skartaci dokumentu: " +
        document.originalName +
        ". Tato notifikace se již nebude zobrazovat.",
      onOk() {
        removeFromNotifs(document.id);
      },
    });
  }

  const redirectToEmployee = async (id) => {
    const response = await await documents.getEmployeeId(id);
    if (response) {
      window.location.href = "/employeeDetail/" + response;
    }
  };

  const removeFromNotifs = async (id) => {
    await documents.removeNotification(id);
    await updateNotifications();
  };

  const columns = [
    {
      title: "Název dokumentu",
      dataIndex: "originalName",
      width: "25%"
    },
    {
      title: "Typ dokumentu",
      dataIndex: ["type", "name"],
    },
    {
      title: "Datum skartace",
      dataIndex: "releaseDate",
      render: (text) => format(new Date(text), "dd. MM. yyyy"),
    },
    {
      title: "",
      dataIndex: "",
    },
    {
      title: "",
      dataIndex: "",
      render: (record) => (
        <Button type="primary" onClick={() => redirectToEmployee(record.id)}>
          Zobrazit
        </Button>
      ),
      align: "center",
    },
    {
      title: "",
      dataIndex: "",
      render: (record) => (
        <Button type="danger" onClick={() => showConfirm(record)}>
          Neupozorňovat
        </Button>
      ),
      align: "center",
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: "2rem" }} justify="center">
        <Col span={16}>
          <ArrowLeftOutlined
            className="backArrow"
            style={{ fontSize: "2rem" }}
            onClick={() => window.history.back()}
          />
        </Col>
      </Row>
      {!notifications ? (
        <Row justify="center">
          <Col span={16}>
            <Table />
          </Col>
        </Row>
      ) : (
        <Row justify="center">
          <Col span={16}>
            <Table columns={columns} dataSource={notifications} rowKey="id" />
          </Col>
        </Row>
      )}
    </>
  );
}
