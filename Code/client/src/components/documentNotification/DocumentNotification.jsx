import { ArrowLeftOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Row, Table } from "antd";
import { format } from 'date-fns';
import documents from "../../services/documents/documents";
import { GetEmployeeByDocumentId } from "../../services/documents/GetEmployeeByDocument";
import { GetNotifDocs } from "../../services/documents/GetNotifDocs";
import "./DocumentNotification.css";

export default function DocumentNotification() {
  const [notifDocs, updateData, isLoading] = GetNotifDocs([]);
  //const [employeeId, setEmployeeId] = GetEmployeeByDocumentId();
  const { confirm } = Modal;

  function showConfirm(document) {
    confirm({
      title: "Ukončení notifikace",
      icon: <ExclamationCircleOutlined />,
      content: "Tímto berete na vědomí blížící se skartaci dokumentu: " +document.originalName+ ". Tato notifikace se již nebude zobrazovat.",
      onOk() {
        removeFromNotifs(document.id)
      }
    });
  }

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
    },
    {
      title: "Datum skartace",
      dataIndex: 'releaseDate',
      render: (text)=>format(new Date(text), 'dd. MM. yyyy'),
    },
    {
      title: '',
      dataIndex: '',
      render: () => <Button type="primary" onClick={()=>console.log("hello")}>Zobrazit</Button>, // Na onClick spravne funguji jen funkce ve tvaru ()=>
      align: 'center'
    },
    {
      title: '',
      dataIndex: '',
      render: (text, record) => <Button type="danger" onClick={() => showConfirm(record)}>Beru na vědomí</Button>, // Na onClick spravne funguji jen funkce ve tvaru ()=>
      align: 'center'
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: "2rem" }}>
        <ArrowLeftOutlined
          className="backArrow"
          style={{ fontSize: "2rem" }}
          onClick={() => window.history.back()}
        />
      </Row>
      {isLoading ? (
        <Table />
      ) : (
        <Table columns={columns} dataSource={notifDocs} rowKey="id" />
      )}
    </>
  );
}
