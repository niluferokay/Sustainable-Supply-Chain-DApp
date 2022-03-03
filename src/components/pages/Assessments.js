import React from 'react'
import LCAIndicators from '../LCAIndicators'
import Sidebar from '../Sidebar'
import Assessment from '../Assessment'
import Button from "../FormButton"
import { useNavigate } from 'react-router-dom'

const Assessments = () => {

  let navigate = useNavigate(); 
  const routeLCA = () =>{ 
    let path = `lca`; 
    navigate(path);}

  return (
    <div className="assess-container">
    <header className="lca-dashheader">
            <div className="lca-container">
                <Button className="btn" 
                // onClick={routeEnviro}
                color="green"
                text="Environmental Assessment"
                />
                <Button className="btn" 
                // onClick={routeLCA}
                color="orange"
                text="Social Assessment"
                />
                <Button className="btn" 
                onClick={routeLCA}
                color="lightblue"
                text="Life Cycle Assessment"
                />
            </div>    
    </header>
    <Assessment/>
    <Sidebar/>
    {/* <LCAIndicators/> */}
    </div>
  )
}

export default Assessments