import './Home.css';
import { Table, Input, Button} from 'antd';
import { data, columns } from './Data.js';
import { Navigate } from 'react-router-dom';

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