import logo from './logo.svg';
import './App.css';
import { LandingPage } from './pages/landing'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
   <>
     <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
