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
    const [page, setPage] = useState(1);
    const [employeesList, isLoading, totalPages] = GetEmployeesList(searchName, page);

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
                pagination={{
                    pageSize: 10,
                    total: totalPages*10,
                    onChange: (page) => {
                        setPage(page);
                        console.log(page);
                    },
                    current:page,
                    simple:true
                }}
            />
            )}
            
            <Button type='primary' className='btnCreateEmployee' onClick={goCreateEmployee}>Přidat zaměstnance</Button>
        </div>
    );
}

export default Home;