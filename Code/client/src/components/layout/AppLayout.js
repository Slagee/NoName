import "./AppLayout.css";
import { Badge, Button, Col, Row } from "antd";
import companyLogo from "../../SD_logo2.png";
import { Header } from "antd/lib/layout/layout";
import authentication from "../../services/authentication/authentication";
import { message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GetNotifDocs } from "../../services/documents/GetNotifDocs";

export function AppLayout({ token }) {
  const [notifDocs] = GetNotifDocs([]);
  let button;
  let username;
  let alert;

  let navigate = useNavigate();
  const routeDocumentNotif = () => {
    let path = `notifications`;
    navigate(path);
  };

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
      <Button type="link" id="notifButton" onClick={routeDocumentNotif}>
        <Badge count={notifDocs.length}>
          <ExclamationCircleOutlined style={{ fontSize: "150%" }} />
        </Badge>
      </Button>
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
