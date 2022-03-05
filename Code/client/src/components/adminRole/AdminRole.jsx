import { Space, Table} from 'antd';
import { Form, Input, Button, Checkbox, Row, Card, Col } from 'antd';
import { Radio } from 'antd';
import './AdminRole.css';
/*import { GetEmployeesList } from './GetEmployeesList';*/
import { useState } from 'react';
import { ArrowLeftOutlined } from "@ant-design/icons/lib/icons";


const { Search } = Input;

export default function AdminRole() {
const [searchName, setSearchName] = useState(null)
const [page, setPage] = useState(1)
/*const [employeesList, isLoading, totalPages] = GetEmployeesList(searchName, page);*/

const columns = [
  {
    title: 'Jméno a Příjmení',
    dataIndex: 'nameSurname',
    key: 'name-surname',
  },
  {
    title: 'Administrátor',
    dataIndex: 'administrator',
    key: 'administrator',
    align: 'center'
  },
  {
    title: 'Mzdový účetní',
    dataIndex: 'accountant',
    key: 'accountant',
    align: 'center'
  },
  {
    title: 'Personalista',
    dataIndex: 'personnel',
    key: 'personnel',
    align: 'center'
  },
];

const data = [
  {
    key: '1',
    nameSurname: 'Leona Blažková',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
  {
    key: '2',
    nameSurname: 'Jaroslava Havlíčková',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
  {
    key: '3',
    nameSurname: 'Erika Sedláčková',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
  {
    key: '4',
    nameSurname: 'Emilie Blažková',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
  {
    key: '5',
    nameSurname: 'Ema Matoušková',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
  {
    key: '6',
    nameSurname: 'Helena Vlčková',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
  {
    key: '7',
    nameSurname: 'Danuše Hrubá',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
  {
    key: '8',
    nameSurname: 'Simona Stáňková',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
  {
    key: '9',
    nameSurname: 'Božena Pavlíková',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
  {
    key: '10',
    nameSurname: 'Magda Křížová',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
  {
    key: '11',
    nameSurname: 'Terezie Nguyen Thi',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
  {
    key: '12',
    nameSurname: 'Helena Novotná',
    administrator: <Radio value={1}></Radio>,
    accountant: <Radio value={2}></Radio>,
    personnel: <Radio value={3}></Radio>,
  },
];
  return(
    <div className='User-Table'>
      <Row>
        <Col span={8}><ArrowLeftOutlined className="backArrow" style={{ fontSize: '2rem' }} onClick={() => window.history.back()} /></Col>
        <Col span={8} offset={8}>
        <Search placeholder="Vyhledej záznam" onChange={e => setSearchName(e.target.value)} enterButton style={{ width: 300, float: 'right', paddingBottom: '25px' }} />
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

<Row>
      <Col span={8}>col-8</Col>
      <Col span={8} offset={8}>
        col-8
      </Col>
    </Row>