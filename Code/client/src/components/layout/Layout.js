import { Col, Row, Button } from 'antd';
import companyLogo from '../../SDlogo.png';
import { Header } from 'antd/lib/layout/layout';

export function Layout() {
    return(
    <Header style={{background:'whitesmoke', color:'rgba(0, 147, 221, 1)', boxShadow: '0px 2px 5px gray'}}>
        <Row>
            <Col span={0.5}><img src={companyLogo} alt="BigCo Inc. logo" width='40'/></Col>
            <Col span={3}><p style={{fontSize: 20}}>Dokumentační systém</p></Col>
            <Col span={19}></Col>
            <Col span={1.5}><Button>Přihlásit se</Button></Col>
        </Row>
    </Header>
    )
}