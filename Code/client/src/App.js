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
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
        </Content>        
      </Layout>
    </div>
  );
}

export default App;
