import './AppLayout.css'
import { Button, Col, Row } from 'antd';
import companyLogo from '../../SD_logo2.png';
import { Header } from 'antd/lib/layout/layout';
import authentication from '../../services/authentication/authentication';
import { message } from 'antd';
import {LogoutOutlined, ExclamationCircleOutlined} from "@ant-design/icons/lib/icons";

export function AppLayout({ token }) {
    let button;
    let username;
    if (!token && token === null) {
        button = null;
        username = null
    } else {
        button = <Button type='submit' onClick={handleLogout} icon={<LogoutOutlined />}>Odhlásit se</Button>
        username = localStorage.getItem("username");
        
    }

    function handleLogout() {
        authentication.logout();
        window.location.replace("/");
        message.warning("Úspěšně jste se odhlásili!");
    }

    return(
        <Header className='layoutHeader' style={{ background: 'white' }}>
            <Row>
                <Col span={4}>
                    <a href='/home' className='logo' onClick={e => { if (!button) e.preventDefault() }}>
                        <img src={companyLogo} alt="Slezská diakonie logo" />
                    </a>
                </Col>
                <Col span={2} offset={15}>
                    {username}
                </Col>
                <Col span={3}>
                    {button}
                </Col>
            </Row>
        </Header>
    )
}