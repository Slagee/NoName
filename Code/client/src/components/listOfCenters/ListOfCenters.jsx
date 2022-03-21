import { Space, Table} from 'antd';
import { Form, Input, Button, Row, Col, Modal } from 'antd';
import './ListOfCenters.css';
import { useState } from 'react';
import { ArrowLeftOutlined, DeleteOutlined, PlusCircleOutlined, EditOutlined} from "@ant-design/icons/lib/icons";
const { Search } = Input;

export default function ListOfCenters() {

const [searchCenters, setSearchCenters] = useState(null)
const [page, setPage] = useState(1)
const [isEditing, setIsEditing] = useState(false);
const [editingCenters, setEditingCenters] = useState(null);

const [dataSource, setDataSource] = useState([
  {
    center: 'ÚSTŘEDÍ Český Těšín', 
  },
  {
    center: 'BETHEL Karviná', 
  },
  {
    center: 'BETANIA Komorní Lhotka', 
  },
  {
    center: 'BETEZDA Komorní Lhotka', 
  },
  {
    center: 'EBEN-EZER Český Těšín', 
  }
]);
const columns = [
    {
      key: 'center',
      title: 'Středisko',
      dataIndex: 'center',
    },
    {
      key: "actions",
      render: (record) => {
        return (
        <>
        <Button type="primary" className='EditButton' htmlType="submit" icon={<EditOutlined/>} onClick={() => {onEditCenter(record);}} style= {{marginLeft: 200 }}>Upravit</Button>
        <Button className='DeleteButton' danger icon={<DeleteOutlined/>} onClick={() => {onDeleteCenter(record);}}>Odstranit</Button>
          </>
        );
      },
    },
  ];

  const onAddCenter = () => {
    const newCenter = {
      center: "Středisko"
    };
    setDataSource((pre) => {
      return [...pre, newCenter];
    });
  };

  const onDeleteCenter = (record) => {
    Modal.confirm({
      title: "Opravdu chcete středisko smazat?",
      okText: "ANO",
      okType: "danger",
      cancelText: "NE",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((center) =>(center.id !== center.id));
        });
      },
    });
  };

  const onEditCenter = (record) => {
    setIsEditing(true);
    setEditingCenters({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingCenters(null);
  };

    return(
      <div className='Centers-Table'>
        <Row>
          <Col span={8}>
            <ArrowLeftOutlined className="backArrow" style={{ fontSize: '2rem' }} onClick={() => window.history.back()} /></Col>
          <Col span={8} offset={1}>
            <Search placeholder="Vyhledej středisko" onChange={e => setSearchCenters(e.target.value)} enterButton style={{ width: 300, float: 'right', paddingBottom: '25px' }} />
          </Col>
        </Row>

        <Row>
          <Col span={10} offset={7}>
            <Table dataSource={dataSource} columns={columns}></Table>
          </Col>
        </Row>

        <Form.Item>
        <Row>
          <Col span={10} offset={7}>
            <Button type="primary" className='SaveButton' htmlType="submit" icon={<PlusCircleOutlined  />} onClick={onAddCenter}>Přidat středisko</Button>
          </Col>
        </Row>   
        </Form.Item>
        <Modal title="Úprava Střediska" visible={isEditing} okText="Uložit" cancelText="Zrušit"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((center => {
                if (center.id === editingCenters.id) {
                  return editingCenters;
                } else {
                  return center;
                }
              }));
            });
            resetEditing();
          }}
        >
          <Input
            value={editingCenters?.name}
            onChange={(e) => {
              setEditingCenters((pre) => {
                return { ...pre, center: e.target.value };
              });
            }}
          />
        </Modal>
      </div>
    );
  }