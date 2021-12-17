import './Home.css';
import { Table, Input, Button } from 'antd';
import { columns } from './Data.js';
import { Navigate } from 'react-router-dom';
import { GetEmployeesList } from './GetEmployeesList';
import { useState } from 'react/cjs/react.development';
import { LoadingOutlined } from '@ant-design/icons/lib/icons';

const { Search } = Input;

const Home = () => {
    const [searchName, setSearchName] = useState(null);
    const [employeesList, isLoading] = GetEmployeesList(searchName);

    let user = localStorage.getItem("username");
    
    if (!user) {
        return <Navigate to="/login" />
    }

    function goCreateEmployee() {
        window.location.href = "/createEmployee";
    }

    return (
        <div>
            <Search placeholder="Vyhledej záznam" onChange={e => setSearchName(e.target.value)} enterButton style={{ width: 300, float: 'right', paddingBottom: '25px' }} />
            {isLoading ?
            (
            <div className='loading'>
                <LoadingOutlined style={{fontSize: '5rem'}} />
                <p>Načítám data...</p>
            </div>
            ) : (
            <Table
                columns={columns}
                dataSource={employeesList}
            />
            )}
            
            <Button type='primary' className='btnCreateEmployee' onClick={goCreateEmployee}>Přidat zaměstnance</Button>
        </div>
    );
}

export default Home;