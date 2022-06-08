import React, { useState, useEffect } from 'react'
import Button from "./FormButton"
import { useNavigate } from 'react-router-dom'
import {Pie} from "react-chartjs-2"
import {Chart, PieController, ArcElement, Tooltip, Legend} from 'chart.js'
Chart.register(PieController, ArcElement, Tooltip, Legend)

const Report = ({enviroCount, socialCount, LCICount}) => {

    const [assessChartData, setAssessChartData] = useState({
        datasets: [],
      });
    
    useEffect(() => { 
        setAssessChartData({
            labels: ["Environmental", "Social", "LCI"],
            datasets: [
              {
                label: "Assessments",
                data: [enviroCount, socialCount, LCICount],
                backgroundColor: ["#279b48", "orange", "#03a0dd"]
              },
            ],
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
    
        }, [enviroCount, socialCount, LCICount]);
        
    let navigate = useNavigate(); 
    const routeLCI = () =>{ 
        let path = `lci`; 
        navigate(path);}
    const routeS = () =>{ 
        let path = `social`; 
        navigate(path);}
    const routeE = () =>{ 
        let path = `enviro`; 
        navigate(path);}

  return (
    <div>
        <header className="report-dashheader">
            <div className="report">
                <Button className="btn" 
                onClick={routeE}
                text="Environmental Assessment Report"
                />
                <Button className="btn" 
                onClick={routeS}
                text="Social Assessment Report"
                />
                <Button className="btn" 
                onClick={routeLCI}
                text="Life Cycle Inventory Report"
                />
            </div>    
        </header>
        <div className='assessChart'>
        <Pie data={assessChartData}/>
        </div>
    </div>
  )
}

export default Report