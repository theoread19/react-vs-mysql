import React from "react";
import './App.css';
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Formdb from "./component/Formdb";
function App(props) {
  return (

      <div>
        <Navbar />
				<Formdb />
				<Footer />
			</div>

  );
}

export default App;
