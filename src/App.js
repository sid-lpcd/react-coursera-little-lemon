import './App.css';
import Header from'./components/Header.js'
import Footer from './components/Footer.js'
import Main from'./components/Main.js'
import Nav from'./components/Nav.js'

function App() {
  return (
    <div className="App">
      <Header/>
      <Nav/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
