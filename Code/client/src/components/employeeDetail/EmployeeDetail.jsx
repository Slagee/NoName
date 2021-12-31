import './EmployeeDetail.css'
import { ArrowLeftOutlined } from "@ant-design/icons/lib/icons";
import { DownloadOutlined, EditOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, Row, Col } from "antd";
import { GetEmployeeById } from "../home/GetEmployeeById";

export default function EmployeeDetail() {
    const [employeeById] = GetEmployeeById();
    function goEditEmployee() {
        window.location.href = "/editEmployee";
    }
    
    return (
        <div className="employeeContent">
            <Row style={{'marginBottom': "2rem"}}>
                <ArrowLeftOutlined className="backArrow" style={{fontSize: '2rem'}} onClick={() => window.history.back()}/>
            </Row>            
            <Row>
                <Col span={4}>Jméno a příjmení:</Col>
                <Col span={6}>{ employeeById.name } { employeeById.surname }</Col>
            </Row>
            <Row>
                <Col span={4}>Rodné číslo:</Col>
                <Col span={6}>{ employeeById.birthNumber }</Col>
            </Row>
            <Row style = {{'marginBottom': "2rem"}}>
                <Col span={4}>Středisko:</Col>
                <Col span={6}>BETEZDA</Col>
            </Row>
            <Row style={{'marginBottom': "4rem"}}>
                <Col span={4}>Uložené soubory:</Col>
                <Col className="files" span={20}>
                    
                    {(employeeById.documentsForEmployee || []).map(({ originalName, type }) => (
                        <Row>
                            <Col span={10}>
                                {type.name} - {originalName}
                            </Col>
                            <Col span={10} offset={1}>
                                <Button type="primary" shape="round" icon={<DownloadOutlined />} size='small'>
                                    Stáhnout
                                </Button>
                            </Col>
                        </Row>
                    ))}

                </Col>
            </Row>
            <Row >
                <Col span={12}>
                    <Button type="secondary" icon={<ExportOutlined />} size='large' style={{'marginRight': "2rem"}}>
                        Exportovat
                    </Button>
                    <Button type="primary" onClick={()=>goEditEmployee()} icon={<EditOutlined /> } size='large'>
                        Upravit
                    </Button>
                </Col>
            </Row>
        </div>
    )
}