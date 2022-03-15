import { AppLayout } from './components/layout/AppLayout';
import Login from './components/login/Login';
import './App.css';
import React from 'react';
import useToken from './services/authentication/useToken';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import CreateEmployee from './components/createEmployee/CreateEmployee';
import EmployeeDetail from './components/employeeDetail/EmployeeDetail';
import EditEmployee from './components/editEmployee/EditEmployee';
import UserRegistration from './components/userRegistration/UserRegistration';
import ListOfCenters from './components/listOfCenters/ListOfCenters';
import AdminRole from './components/adminRole/AdminRole';

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <Layout>
        <AppLayout token={token} />
        <Content className='Content'>
        <BrowserRouter>
          <Routes>            
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createEmployee" element={<CreateEmployee />} />
            <Route path="/employeeDetail/:id" element={<EmployeeDetail />}/>
            <Route path="/editEmployee/:id" element={<EditEmployee />}/>
            <Route path="/userRegistration" element={<UserRegistration />}/>
            <Route path="/listOfCenters" element={<ListOfCenters />}/>
            <Route path="/adminRole" element={<AdminRole />}/>
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
        </Content>        
      </Layout>
    </div>
  );
}

export default App;