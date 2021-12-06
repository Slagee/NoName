import Login from './components/login/Login';
import './App.css';
import React from 'react';
import useToken from './components/login/useToken';

function App() {
  const { token, setToken } = useToken();
  var user = JSON.parse(localStorage.getItem('user'));
  const {username: email} = user;

  if(!token)
  {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <h1>Welcome user {email}</h1>
    </div>
  );
}

export default App;
