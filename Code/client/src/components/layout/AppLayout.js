import './AppLayout.css'
import { Button, Col, Row, Menu, Dropdown } from 'antd';
import companyLogo from '../../SD_logo2.png';
import { Header } from 'antd/lib/layout/layout';
import authentication from '../../services/authentication/authentication';
import { message } from 'antd';
import { ToolOutlined, UserAddOutlined , SettingOutlined , LogoutOutlined, ShopOutlined, DownOutlined} from "@ant-design/icons/lib/icons";

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
    function goListOfCentres() {
        window.location.href = "/listOfCenters";
    }

    const menu = (
    <Menu>
        <Menu.Item>
            <Button type='link' onClick={goUserRegistration} icon={<UserAddOutlined/>}>Registrace uživatele</Button>
        </Menu.Item>
        <Menu.Item>
            <Button type='link' onClick={goAdminRole} icon={<SettingOutlined />}>Editace rolí</Button>
        </Menu.Item>
        <Menu.Item>
            <Button type='link' onClick={goListOfCentres} icon={<ShopOutlined />}>Seznam středisek</Button>
        </Menu.Item>
    </Menu>);

    return(
        <Header className='layoutHeader' style={{ background: 'white' }}>
            <Row>
                <Col span={1}>
                    <a href='/home' className='logo' onClick={e => { if (!button) e.preventDefault() }}>
                        <img src={companyLogo} alt="Slezská diakonie logo" />
                    </a>
                </Col>
                <Col span={1} className='version'>v0.3</Col>
                
                <Col span={2} offset={16}>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <ToolOutlined/> Nástroje <DownOutlined />
                        </a>
                    </Dropdown>
                </Col>

                <Col span={1}>
                    {username}
                </Col>
                <Col span={2}>
                    {button}
                </Col>
            </Row>
        </Header>
    )
}