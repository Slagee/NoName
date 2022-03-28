import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Modal, Row, Table } from "antd";
import { format } from "date-fns";
import documents from "../../services/documents/documents";
import { GetNotifDocs } from "../../services/documents/GetNotifDocs";
import "./DocumentNotification.css";

export default function DocumentNotification() {
  const [notifDocs, updateData, isLoading] = GetNotifDocs([]);
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
    const response = await documents.getNotifDocs();
    if (response) {
      updateData(response);
    }
  };

  const columns = [
    {
      title: "Název dokumentu",
      dataIndex: "originalName",
      width: "30%",
    },
    {
      title: "Datum skartace",
      dataIndex: "releaseDate",
      render: (text) => format(new Date(text), "dd. MM. yyyy"),
      width: "30%",
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
      width: "20%",
    },
    {
      title: "",
      dataIndex: "",
      render: (record) => (
        <Button type="danger" onClick={() => showConfirm(record)}>
          X
        </Button>
      ),
      align: "center",
      width: "20%",
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
      {isLoading ? (
        <Table />
      ) : (
        <Row justify="center">
          <Col span={16}>
            <Table columns={columns} dataSource={notifDocs} rowKey="id" />
          </Col>
        </Row>
      )}
    </>
  );
}
