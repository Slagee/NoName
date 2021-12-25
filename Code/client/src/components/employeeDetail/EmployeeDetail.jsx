import { ArrowLeftOutlined } from "@ant-design/icons/lib/icons";
import { DownloadOutlined, EditOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, Row, Col, Typography } from "antd";
import { Navigate } from "react-router-dom";
import employees from "../../services/employees/employees";
import './EmployeeDetail.css'
import { id } from "../../services/employees/selector";
import { GetEmployeeById } from "../home/GetEmployeeById";
import { LoadingOutlined } from '@ant-design/icons/lib/icons';

const {Title} = Typography;

export default function EmployeeDetail() {
    const [employeeById, isLoading] = GetEmployeeById(id);
    function goEditEmployee() {
        window.location.href = "/editEmployee";
    }
    

    return (
        isLoading ? 
        (
        <div className='loading'>
            <LoadingOutlined style={{fontSize: '5rem'}} />
            <p>Načítám data...</p>
        </div>
        ):(
            <div className="employeeContent">
            <Row style={{'marginBottom': "2rem"}}>
                <ArrowLeftOutlined className="backArrow" style={{fontSize: '2rem'}} onClick={() => window.history.back()}/>
            </Row>            
            <Row>
                <Col span={4}>Jméno a příjmení:</Col>
                <Col span={6}>{employeeById}</Col>
            </Row>
            <Row>
                <Col span={4}>Datum narození:</Col>
                <Col span={6}>16.07.1999</Col>
            </Row>
            <Row style = {{'marginBottom': "2rem"}}>
                <Col span={4}>Středisko:</Col>
                <Col span={6}>BETEZDA</Col>
            </Row>
            <Row style={{'marginBottom': "4rem"}}>
                <Col span={4}>Uložené soubory:</Col>
                <Col className="files" span={6}>
                    <Row>
                        <Col>
                            Soubooor
                        </Col>
                        <Col offset={3}>
                            <Button type="primary" shape="round" icon={<DownloadOutlined />} size='small'>
                                Stáhnout
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row >
                <Col span={12}>
                    <Button type="secondary" icon={<ExportOutlined />} size='large' style={{'marginRight': "2rem"}}>
                        Exportovat
                    </Button>
                    <Button type="primary" icon={<EditOutlined />} size='large' onClick={goEditEmployee}>
                        Upravit
                    </Button>
                </Col>
            </Row>
        </div>
        )
        
    )
}