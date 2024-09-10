import './App.css';
import Header from'./components/Header.js'
import Footer from './components/Footer.js'
import Main from'./components/Main.js'
import Nav from'./components/Nav.js'
import { Routes, Route } from "react-router-dom";
import BookingPage from './components/BookingPage.js'

function App() {
  return (
    <div className="App">
      <Header/>
      <Nav/>
      <Routes> 
          <Route path="/" element={<Main/>}></Route>
          <Route path="/booking" element={<BookingPage />}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
