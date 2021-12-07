import Login from './components/login/Login';
import './App.css';
import React from 'react';
import useToken from './components/login/useToken';
import 'antd/dist/antd.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';

function App() {
  const { token, setToken } = useToken();
  if(!token)
  {
    return <Login setToken={setToken} />
  }

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
