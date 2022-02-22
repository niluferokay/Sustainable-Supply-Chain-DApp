import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Products from './components/pages/Products';

function App() {
    return (
        <>
        <Router>
            <Routes>
            <Route path="/" element= {<Dashboard/>}/>
            <Route path="/products" element= {<Products/>}/>
            </Routes>
        </Router>
        </>
      );
    }

export default App;
