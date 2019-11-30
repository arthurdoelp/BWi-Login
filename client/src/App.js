import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Accounts from "./components/accounts";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Login></Login>
      <Accounts></Accounts>
      <Footer></Footer>
    </div>
  );
}

export default App;
