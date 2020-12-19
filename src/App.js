import React from "react";
import './App.css';
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Formdb from "./component/Formdb";
function App(props) {
  return (
    //tu tao lai class
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <Formdb />
      </div>
      <Footer />
    </div>

  );
}

export default App;
