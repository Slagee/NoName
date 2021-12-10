import Login from './components/login/Login';
import './App.css';
import React from 'react';
import useToken from './services/authentication/useToken';
import 'antd/dist/antd.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
