import { InboxOutlined } from "@ant-design/icons/lib/icons";
import { Col, message, Row } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import documents from "../../services/documents/documents";

export default function AddDocument({ employeeId }) {
  const draggerProps = {
    name: "file",
    multiple: false,
    accept: ".pdf",
    showUploadList: false,
    action: (param) => {
      console.log("param: ", param);
      const formData = new FormData();
      const json = {
        releaseDate: Date.now(),
        validityDate: "2023-01-01T22:00:00.000+00:00",
        employeeForDocument: {
          id: employeeId,
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

      documents.createDocument(formData).then((res) => {
        if (res === true) {
          message.success("Dokument byl úspěšně odeslán");
        } else {
          message.error(res);
        }
      });
    },
  };
  return (
    <Row justify="center">
      <Col span={23}>
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
  );
}
