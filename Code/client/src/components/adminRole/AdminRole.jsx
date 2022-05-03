import {Col, Row, Table} from "antd";
import { Input} from "antd";
import "./AdminRole.css";
import { useState } from "react";
import {columns} from "./PermTableData";
import {GetUserList} from "./GetUserList";
import {Navigate} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons/lib/icons";
import {GetUserAdminStatus} from "./GetUserAdminStatus";

const { Search } = Input;

export default function AdminRole() {
    const [searchMail, setSearchMail] = useState(null);
    var [page, setPage] = useState(1);
    const [userList, isLoading, totalPages] = GetUserList(searchMail, page);
    let user = localStorage.getItem("username");
    let isAdmin = GetUserAdminStatus();

    if (!user) return <Navigate to="/login"/>
    if (!isAdmin) return <Navigate to="/home"/>

  return (
      <div>
          <Row>
              <Col span={8}>
                  <ArrowLeftOutlined
                      className="backArrow"
                      style={{ fontSize: "2rem" }}
                      onClick={() => window.history.back()}
                  />
              </Col>
              <Col span={16}>
                  <Search placeholder="Vyhledej záznam" onChange= { (e) => { setSearchMail(e.target.value); setPage(1)}} enterButton style={{ width: 300, float: 'right', paddingBottom: '25px' }} />
              </Col>
          </Row>

        {isLoading ?
            (
                <Table />
            ) : (
                <Table
                    columns={columns}
                    dataSource={userList}
                    pagination={{
                      pageSize: 10,
                      total: totalPages*10,
                      onChange: (page) => {
                        setPage(page);
                      },
                      current:page,
                      simple:true
                    }}
                />
            )}
      </div>
  );
}
