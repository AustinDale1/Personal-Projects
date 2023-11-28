import './App.css';
import ReactDOM from "react-dom/client";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from "./pages/Home";
import Create from "./pages/Create";
import Review from "./pages/Review";
import NoPage from "./pages/NoPage";



function App() {
  const [cards, setCards] = useState([]);
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout setCards={setCards} cards={cards}/>}>
          <Route index element={<Home setCards={setCards} cards={cards}/>} />
          <Route path="Create" element={<Create setCards={setCards} cards={cards}/>} />
          <Route path="Review" element={<Review setCards={setCards} cards={cards}/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
