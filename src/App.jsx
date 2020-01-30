import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import TopBar from './Components/Topbar/Topbar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer';
import Ctx_User from './Ctx_User';
import './App.css';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res, err) => {
        if (err) {
          console.log(err);
        }
        setUser(res.data);
        console.log(res.data, 'on app')
      });
    } else {
      setUser({});
    }
  }, []);

  return (
    <div className="App">
      <Ctx_User.Provider value={[user, setUser]} >
        <TopBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
        <Footer />
      </Ctx_User.Provider>
    </div>
  );
}

export default App;