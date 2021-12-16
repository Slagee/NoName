import './Home.css';
import { Table, Input, Button, Spin, Space} from 'antd';
import { columns, dataHard } from './Data.js';
import { Navigate } from 'react-router-dom';
import employees from "../../services/employees/employees";


const { Search } = Input;
const onSearch = value => console.log(value);

export default function Home() {
    let user = localStorage.getItem("username");
    
    if (!user) {
        return <Navigate to="/login" />
    }

    function goCreateEmployee() {
        window.location.href = "/createEmployee";
    }

    console.log(dataHard);
    
    var data = employees.getEmployeesPaged()
        .then((res) => {
            var dataObject = {employeeArray: []};

            for(var i in res.content) {    
                var item = res.content[i];   
                dataObject.employeeArray.push({
                    "key" : item.id, 
                    "name" : item.name + " " + item.surname,
                    "birthNumber" : item.birthNumber
                });
            }
            console.log(dataObject.employeeArray);
            return dataObject.employeeArray;
        });

    if (data === null && !Array.isArray(data)){
        return (
            <div>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
        )
    }
    else if (data !== null && Array.isArray(data)){
        return (
            <div>
                <Search placeholder="Vyhledej záznam" onSearch={onSearch} enterButton style={{ width: 300, float: 'right', paddingBottom: '25px' }} />
                <Table
                    columns={columns}
                    dataSource={data}
                    title={() => 'Seznam profilů'}
                />
                <Button type='primary' className='btnCreateEmployee' onClick={goCreateEmployee}>Přidat zaměstnance</Button>
            </div>
        )
    }    
}