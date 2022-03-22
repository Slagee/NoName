import { Table} from 'antd';
import { Form, Input, Button, Row, Col } from 'antd';
import './ListOfCenters.css';
import { useState } from 'react';
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons/lib/icons";

const { Search } = Input;

export default function ListOfCenters() {

const [searchCenters, setSearchCenters] = useState(null)
const [page, setPage] = useState(1)

const columns = [
    {
      title: 'Středisko',
      dataIndex: 'center',
      key: 'center',
    },
    {
      dataIndex: 'editing',
      key: 'editing',
      align: 'center',
      width: '6%'
    },
    {
      dataIndex: 'deletion',
      key: 'deletion',
      align: 'center',
      width: '6%'
    },
  ];
  
  const data = [
    {
      key: '1',
      center: 'ÚSTŘEDÍ Český Těšín',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '2',
      center: 'BETHEL Karviná',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '3',
      center: 'BETANIA Komorní Lhotka',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '4',
      center: 'BETEZDA Komorní Lhotka',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '5',
      center: 'EBEN-EZER Český Těšín',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    }
  ];
    return(
      <div className='Centers-Table'>
        <Row>
          <Col span={8}>
            <ArrowLeftOutlined className="backArrow" style={{ fontSize: '2rem' }} onClick={() => window.history.back()} /></Col>
          <Col span={8} offset={8}>
            <Search placeholder="Vyhledej středisko" onChange={e => setSearchCenters(e.target.value)} enterButton style={{ width: 300, float: 'right', paddingBottom: '25px' }} />
          </Col>
        </Row>

        <Row>
          <Col span={10} offset={7}>
            <Table dataSource={data} columns={columns}></Table>
          </Col>
        </Row>

        <Form.Item>
        <Row>
          <Col span={10} offset={7}> 
            <Button type="primary" className='SaveButton' htmlType="submit">Uložit změny</Button>
          </Col>
        </Row>   
        </Form.Item>
      </div>
    );
  }