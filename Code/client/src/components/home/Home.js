import { Layout, Table, Space, Input} from 'antd';
import { data, columns } from './Data.js';

const { Content } = Layout;
const { Search } = Input;
const onSearch = value => console.log(value);

export default function Home() {

    return(
                <Content style={{ padding: '25px 100px' }}>
                    <Search placeholder="Vyhledej záznam" onSearch={onSearch} enterButton style={{ width: 300, float: 'right', paddingBottom: '25px' }} />
                    <Table
                        columns={columns}
                        dataSource={data}
                        title={() => 'Seznam profilů'}
                    />
                </Content>
    )
}