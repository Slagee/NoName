import './App.css';
import "antd/dist/antd.css";
import { Col, Layout, Row, Button, Table, Space, Input} from 'antd';
import companyLogo from '../src/SDlogo.png';
import { data, columns } from './Data.js';
const { Header, Content } = Layout;
const { Search } = Input;
const onSearch = value => console.log(value);

function App() {
  return (
    <div className="App">
      <Layout>
        <Space direction= "vertical">
        <Header style={{background:'whitesmoke', color:'rgba(0, 147, 221, 1)', boxShadow: '0px 2px 5px gray'}}>
          <Row>
            <Col span={0.5}><img src={companyLogo} alt="BigCo Inc. logo" width='40'/></Col>
            <Col span={3}><p style={{fontSize: 20}}>Dokumentační systém</p></Col>
            <Col span={19}></Col>
            <Col span={1.5}><Button>Přihlásit se</Button></Col>
          </Row>
        </Header>

        <Content style={{ padding: '25px 100px' }}>
          <Search placeholder="Vyhledej záznam" onSearch={onSearch} enterButton style={{ width: 300, float: 'right', paddingBottom: '25px' }}/>
          <Table
            columns={columns}
            dataSource={data}
            title={() => 'Seznam profilů'}
          />
        </Content>
        </Space>
      </Layout>
    </div>
  );
}

export default App;
