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
import LCAReport from './components/pages/LCAReport';
import SocialReport from './components/pages/SocialReport';
import Journey from './components/pages/Journey';
import Harvest from './components/pages/Harvest';
import Yarn from './components/pages/Yarn';
import Fabric from './components/pages/Fabric';
import Sew from './components/pages/Sew';
import Supplier1 from './components/pages/Supplier1';
import Supplier2 from './components/pages/Supplier2';
import Supplier3 from './components/pages/Supplier3';
import Supplier4 from './components/pages/Supplier4';
import Company from './components/pages/Company';

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
            <Route path="/reports" element= {<Reports/>}/>
            <Route path="/reports/enviro" element= {<EnviroReport/>}/>
            <Route path="/reports/lca" element= {<LCAReport/>}/>
            <Route path="/reports/social" element= {<SocialReport/>}/>
            <Route path="/journey" element= {<Journey/>}/>
            <Route path="/journey/harvest" element= {<Harvest/>}/>
            <Route path="/journey/yarn" element= {<Yarn/>}/>
            <Route path="/journey/fabric" element= {<Fabric/>}/>
            <Route path="/journey/sew" element= {<Sew/>}/>
            <Route path="/journey/supplier1" element= {<Supplier1/>}/>
            <Route path="/journey/supplier2" element= {<Supplier2/>}/>
            <Route path="/journey/supplier3" element= {<Supplier3/>}/>
            <Route path="/journey/supplier4" element= {<Supplier4/>}/>
            <Route path="/journey/company" element= {<Company/>}/>
            </Routes>
        </Router>
        </>
      );
    }

export default App;
