import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Products from './components/pages/Products';
import Assessments from './components/pages/Assessments';
import LCAForm from './components/pages/LCAForm';
import SocialForm from './components/pages/SocialForm';
import EnviroForm from './components/pages/EnviroForm';
import Reports from './components/pages/Reports';
import EnviroReport from './components/pages/EnviroReport';
import EnviroAssess from './components/pages/EnviroAssess';
import SocialAssess from './components/pages/SocialAssess';
import LCIAssess from './components/pages/LCIAssess';
import LCAReport from './components/pages/LCAReport';
import SocialReport from './components/pages/SocialReport';
import Journey from './components/pages/Journey';
import AssessLCI from './components/pages/AssessLCI';
import AssessES from './components/pages/AssessES';

function App() {
    return (
        <>
        <Router>
            <Routes>
            <Route path="/" element= {<Dashboard/>}/>
            <Route path="/products" element= {<Products/>}/>
            <Route path="/assessments" element= {<Assessments/>}/>
            <Route path="/assessments/enviro" element= {<EnviroAssess/>}/>
            <Route path="/assessments/social" element= {<SocialAssess/>}/>
            <Route path="/assessments/lci" element= {<LCIAssess/>}/>
            <Route path="/forms/lci" element= {<LCAForm/>}/>
            <Route path="/forms/social" element= {<SocialForm/>}/>
            <Route path="/forms/enviro" element= {<EnviroForm/>}/>
            <Route path="/reports" element= {<Reports/>}/>
            <Route path="/reports/enviro" element= {<EnviroReport/>}/>
            <Route path="/reports/lci" element= {<LCAReport/>}/>
            <Route path="/reports/social" element= {<SocialReport/>}/>
            <Route path="/journey" element= {<Journey/>}/>
            <Route path="/journey/lci" element= {<AssessLCI/>}/>
            <Route path="/journey/assessments" element= {<AssessES/>}/>
            </Routes>
        </Router>
        </>
      );
    }

export default App;
