import { AppLayout } from './components/layout/AppLayout';
import Login from './components/login/Login';
import './App.css';
import React from 'react';
import useToken from './services/authentication/useToken';
import 'antd/dist/antd.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <Layout>
        <AppLayout token={token} />
        <Content>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
        </Content>        
      </Layout>
    </div>
  );
}

export default App;
