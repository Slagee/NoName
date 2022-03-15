import "./AppLayout.css";
import { Badge, Button, Card, Col, Empty, Popover, Row } from "antd";
import companyLogo from "../../SD_logo2.png";
import { Header } from "antd/lib/layout/layout";
import authentication from "../../services/authentication/authentication";
import { message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { GetNotifDocs } from "../../services/documents/GetNotifDocs";
import { GetEmployeeByDocumentId } from "../../services/documents/GetEmployeeByDocument";

export function AppLayout({ token }) {
  let button;
  let username;
  let alert;
  const [notifDocs, isLoading] = GetNotifDocs([]);
  const [employeeId, setEmployeeId] = GetEmployeeByDocumentId();

  function onClickHandle(id) {
    setEmployeeId(id);
    console.log(employeeId);
  }

  const content = (
    <div>
      {isLoading ? (
        <div></div>
      ) : (
        <div>
          {notifDocs.length === 0 ? (
            <Empty />
          ) : (
            notifDocs.map((doc) => (
              <Row key={doc.id} onClick={() => onClickHandle(doc.id)}>
                  <Card id="notifCard" bordered={false} hoverable>
                    <p id="notifDocName">{doc.originalName}</p>
                    <span id="notifDocName">Datum skartace:</span> {doc.releaseDate}
                  </Card>
              </Row>
            ))
          )}
        </div>
      )}
    </div>
  );

  if (!token && token === null) {
    button = null;
    username = null;
    alert = null;
  } else {
    button = (
      <Button type="submit" onClick={handleLogout}>
        Odhlásit se
      </Button>
    );
    username = localStorage.getItem("username");
    alert = (
      <Popover
        id="content"
        placement="bottom"
        content={content}
        trigger="click"
      >
        {isLoading ? (
          <div></div>
        ) : (
          <Button type="link" id="notifButton">
            <Badge count={notifDocs.length}>
              <ExclamationCircleOutlined style={{ fontSize: "150%" }} />
            </Badge>
          </Button>
        )}
      </Popover>
    );
  }

  function handleLogout() {
    authentication.logout();
    window.location.replace("/");
    message.warning("Úspěšně jste se odhlásili!");
  }

  return (
    <Header className="layoutHeader" style={{ background: "white" }}>
      <Row>
        <Col span={4}>
          <a
            href="/home"
            className="logo"
            onClick={(e) => {
              if (!button) e.preventDefault();
            }}
          >
            <img src={companyLogo} alt="Slezská diakonie logo" />
          </a>
        </Col>
        <Col span={1} offset={14}>
          {alert}
        </Col>
        <Col span={2}>{username}</Col>
        <Col span={3}>{button}</Col>
      </Row>
    </Header>
  );
}
