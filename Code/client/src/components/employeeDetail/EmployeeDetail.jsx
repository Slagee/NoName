import './EmployeeDetail.css'
import { ArrowLeftOutlined } from "@ant-design/icons/lib/icons";
import { DownloadOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Row, Col, Divider } from "antd";
import { useParams } from "react-router-dom";
import './EmployeeDetail.css'
import { GetEmployeeById } from "../home/GetEmployeeById";
import { LoadingOutlined } from '@ant-design/icons/lib/icons';
import documents from '../../services/documents/documents';

export default function EmployeeDetail() {
    const params = useParams();
    const [employeeById, isLoading] = GetEmployeeById(params.id);

    function goEditEmployee() {
        window.location.href = "/editEmployee/"+params.id;
    }
    function readEmployeeUnit(){
        if (!employeeById.unitForEmployee) {
            return "Zaměstnanec nemá vyplněné středisko"
        } else { return employeeById.unitForEmployee.name}
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
                <Col span={6}>{ employeeById.name } { employeeById.surname }</Col>
            </Row>
            <Row>
                <Col span={4}>Rodné číslo:</Col>
                <Col span={6}>{ employeeById.birthNumber }</Col>
            </Row>
            <Row style = {{'marginBottom': "2rem"}}>
                <Col span={4}>Středisko:</Col>
                <Col span={6}>
                    {(() => {
                        switch (employeeById.unitForEmployee) {
                            case null:   return "Středisko neuvedeno";
                            default: return employeeById.unitForEmployee.name;
                        }
                     })()}
                </Col>
            </Row>
            <Row style={{'marginBottom': "4rem"}}>
                <Col span={4}>Uložené soubory:</Col>
                <Col className="files" span={20}>
                    
                    {(employeeById.documentsForEmployee || []).map(({ originalName, type, id }) => (
                        <Row>
                            <Col span={10}>
                                {type.name}
                            </Col>
                            <Col span={10}>
                                {originalName}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={()=> documents.downloadDocumentById(id)} shape="round" icon={<DownloadOutlined />} size='middle'>
                                    Stáhnout
                                </Button>
                            </Col>
                            <Divider />
                        </Row>
                        
                    ))}

                </Col>
            </Row>
            <Row >
                <Col span={2}>{/*
                    <Button type="secondary" icon={<ExportOutlined />} size='large' style={{'marginRight': "2rem"}}>
                        Exportovat
                    </Button>*/}
                </Col>
                <Col span={2} offset={20}>
                    <Button type="primary" icon={<EditOutlined />} size='large' onClick={goEditEmployee}>
                        Upravit
                    </Button>
                </Col>
            </Row>
        </div>
        )
        
    )
}