import { Space, Table} from 'antd';
import { Form, Input, Button, Checkbox, Row, Card, Col } from 'antd';
import './AdminRole.css';
/*import { GetEmployeesList } from './GetEmployeesList';*/
import { useState } from 'react';
import { ArrowLeftOutlined } from "@ant-design/icons/lib/icons";


const { Search } = Input;

export default function AdminRole() {
function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
const [searchName, setSearchName] = useState(null)
const [page, setPage] = useState(1)
/*const [employeesList, isLoading, totalPages] = GetEmployeesList(searchName, page);*/

const columns = [
  {
    title: 'Jméno',
    dataIndex: 'name',
    key: 'surname',
    width: '12%'
  },
  {
    title: 'Příjmení',
    dataIndex: 'surname',
    key: 'surname',
  },
  {
    title: 'Administrátor',
    dataIndex: 'administrator',
    key: 'administrator',
    align: 'center',
    width: '12%'
  },
  {
    title: 'Mzdový účetní',
    dataIndex: 'accountant',
    key: 'accountant',
    align: 'center',
    width: '12%'
  },
  {
    title: 'Personalista',
    dataIndex: 'personnel',
    key: 'personnel',
    align: 'center',
    width: '12%'
  },
];

const data = [
  {
    key: '1',
    name: 'Leona',
    surname: 'Blažková',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
  {
    key: '2',
    name: 'Jaroslava',
    surname: 'Havlíčková',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
  {
    key: '3',
    name: 'Erika',
    surname: 'Sedláčková',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
  {
    key: '4',
    name: 'Emilie',
    surname: 'Blažková',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
  {
    key: '5',
    name: 'Ema',
    surname: 'Matoušková',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
  {
    key: '6',
    name: 'Helena',
    surname: 'Vlčková',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
  {
    key: '7',
    name: 'Danuše',
    surname: 'Hrubá',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
  {
    key: '8',
    name: 'Simona',
    surname: 'Stáňková',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
  {
    key: '9',
    name: 'Božena',
    surname: 'Pavlíková',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
  {
    key: '10',
    name: 'Magda',
    surname: 'Křížová',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
  {
    key: '11',
    name: 'Terezie',
    surname: 'Nguyen Thi',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
  {
    key: '12',
    name: 'Helena',
    surname: 'Novotná',
    administrator: <Checkbox onChange={onChange}></Checkbox>,
    accountant: <Checkbox onChange={onChange}></Checkbox>,
    personnel: <Checkbox onChange={onChange}></Checkbox>,
  },
];
  return(
    <div className='User-Table'>
      <Row>
        <Col span={8}><ArrowLeftOutlined className="backArrow" style={{ fontSize: '2rem' }} onClick={() => window.history.back()} /></Col>
        <Col span={8} offset={8}>
        <Search placeholder="Vyhledej uživatele" onChange={e => setSearchName(e.target.value)} enterButton style={{ width: 300, float: 'right', paddingBottom: '25px' }} />
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