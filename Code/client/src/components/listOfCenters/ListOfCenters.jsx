import { Space, Table} from 'antd';
import { Form, Input, Button, Row, Col } from 'antd';
import './ListOfCenters.css';
import { useState } from 'react';
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons/lib/icons";

const { Search } = Input;

export default function ListOfCenters() {

const [searchName, setSearchName] = useState(null)
const [page, setPage] = useState(1)

const columns = [
    {
      title: 'Středisko',
      dataIndex: 'center',
      key: 'center',
      align: 'center'

    },
    {
      dataIndex: 'editing',
      key: 'editing',
      align: 'center'
    },
    {
      dataIndex: 'deletion',
      key: 'deletion',
      align: 'center'
    },
  ];
  
  const data = [
    {
      key: '1',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '2',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '3',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '4',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '5',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '6',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '7',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '8',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '9',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '10',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '11',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
    {
      key: '12',
      center: 'Leona',
      editing: <Button type="primary" htmlType="submit">Upravit</Button>,
      deletion: <Button danger icon={<DeleteOutlined/>}>Odstranit</Button>, 
    },
  ];
    return(
      <div className='Centers-Table'>
        <Row>
          <Col span={8}><ArrowLeftOutlined className="backArrow" style={{ fontSize: '2rem' }} onClick={() => window.history.back()} /></Col>
          <Col span={8} offset={8}>
          <Search placeholder="Vyhledej středisko" onChange={e => setSearchName(e.target.value)} enterButton style={{ width: 300, float: 'right', paddingBottom: '25px' }} />
          </Col>
        </Row>
  
        <Table dataSource={data} columns={columns}></Table>
        <Form.Item>
      <Button type="primary" className='SaveButton' htmlType="submit">
        Uložit změny
      </Button>
    </Form.Item>
      </div>
    );
  }