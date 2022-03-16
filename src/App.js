import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Products from './components/pages/Products';
import Assessments from './components/pages/Assessments';
import LCAForm from './components/pages/LCAForm';
import SocialForm from './components/pages/SocialForm';
import EnviroForm from './components/pages/EnviroForm';

function App() {
    return (
        <>
        <Router>
            <Routes>
            <Route path="/" element= {<Dashboard/>}/>
            <Route path="/products" element= {<Products/>}/>
            <Route path="/assessments" element= {<Assessments/>}/>
            <Route path="/assessments/lca" element= {<LCAForm/>}/>
            <Route path="/assessments/social" element= {<SocialForm/>}/>
            <Route path="/assessments/enviro" element= {<EnviroForm/>}/>
            </Routes>
        </Router>
        </>
      );
    }

export default App;
