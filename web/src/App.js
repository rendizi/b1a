import logo from './logo.svg';
import './App.css';
import Main from './pages/Main';
import Ba from './pages/Ba';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Main />} />
          <Route path="*" element={<Ba />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
