import './App.css';
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
