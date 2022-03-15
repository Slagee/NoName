import './AppLayout.css'
import { Button, Col, Row } from 'antd';
import companyLogo from '../../SD_logo2.png';
import { Header } from 'antd/lib/layout/layout';
import authentication from '../../services/authentication/authentication';
import { message } from 'antd';
import { UserAddOutlined , SettingOutlined , LogoutOutlined} from "@ant-design/icons/lib/icons";

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

    function goUserRegistration() {
        window.location.href = "/userRegistration";
    }
    function goAdminRole() {
        window.location.href = "/adminRole";
    }

    return(
        <Header className='layoutHeader' style={{ background: 'white' }}>
            <Row>
                <Col span={1}>
                    <a href='/home' className='logo' onClick={e => { if (!button) e.preventDefault() }}>
                        <img src={companyLogo} alt="Slezská diakonie logo" />
                    </a>
                </Col>
                <Col span={1} className='version'>v0.2</Col>
                            {/* Doplnit funkci ověřující zda je uživatel administrátor */}

                <Col span={3} offset={7}><Button type='link' className='regBtn' onClick={goUserRegistration} icon={<UserAddOutlined/>}>Registrace uživatele</Button></Col>
                <Col span={3}><Button type='link' className='adminBtn' onClick={goAdminRole} icon={<SettingOutlined />}>Editace rolí</Button></Col>
                <Col span={2} offset={4}>
                    {username}
                </Col>
                <Col span={3}>
                    {button}
                </Col>
            </Row>
        </Header>
    )
}