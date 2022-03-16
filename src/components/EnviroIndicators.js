import React from 'react'
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';

const EnviroIndicators = ({onAdd}) => {
  return (
    <>
    <div className="lca-container">
    <div className='lca-indicator'>
      <table className='lca-table'>
      <caption>Enviromental Indicators</caption>
      <thead>
          <th>Categories</th>
          <th>Indicators</th>
          <th>Measurements</th>
          <th>Values</th>
          <th>Units</th>
      </thead>
      <tbody>
            <tr>
                <th rowspan='14'>Natural Resources</th>
                <th rowspan='1'>Energy consumption <GiIcons.GiElectric/></th>
                <th>Amount of energy consumption per day</th>
                <td>energy</td>
                <td>kWh/ day</td>
            </tr>
            <tr>
                <th rowspan="2">Energy efficiency <MdIcons.MdPowerOff/></th>
                <th>Amount of reduced energy per day</th>
                <td>energyred</td>
                <td>kWh/ day</td>
            </tr>
            <tr>
                <th>Percentage of energy reduced per day</th>
                <td>energyred*100/energy</td>
                <td>%</td>
            </tr> 
            <tr>
                <th rowspan='3'>Renewable energy <GiIcons.GiWindTurbine/></th>
                <th>Type of renewable energy used</th>
                <td>renewenergytype</td>            
                <td></td>
            </tr>  
            <tr>
                <th>Amount of renewable energy used per day</th>
                <td>renewenergy</td>
                <td>kWh/ day</td>
            </tr> 
            <tr>
                <th>Percentage of renewable energy used per day</th>
                <td>renewenergy*100/energy</td>
                <td>%</td>
            </tr>
            <tr>
                <th rowspan='1'>Water consumption <GiIcons.GiWaterDrop/></th>
                <th>Amount of water consumption per day</th>
                <td>water</td>
                <td>m3/ day</td>
            </tr>
            <tr>
                <th rowspan='2'>Recycled/reused water <GiIcons.GiWaterRecycling/></th>
                <th>Amount of recycled/reused water per day</th>
                <td>waterrec</td>
                <td>m3/ day</td>
            </tr>
            <tr>
                <th>Percentage of recycled/reused water per day</th>
                <td>waterrec*100/water</td>
                <td>%</td>
            </tr>
            <tr>
                <th rowspan='1'>Material consumption <AiIcons.AiFillGold/><AiIcons.AiFillGold/></th>
                <th>Amount of materials other than water used per day</th>
                <td>material</td>
                <td>kg or t/ day</td>
            </tr>
            <tr>
                <th rowspan='2'>Material efficiency <AiIcons.AiFillGold/></th>
                <th>Amount of reduced materials per day</th>
                <td>materialred</td>
                <td>kg or t/ day</td>
            </tr>
            <tr>
                <th>Percentage of reduced materials per day</th>
                <td>materialred*100/material</td>
                <td>%</td>
            </tr>
            <tr>
                <th rowspan='2'>Recycled/reused materials <BiIcons.BiRecycle/></th>
                <th>Amount of recycled/reused materials per day</th>
                <td>materialrec</td>
                <td>kg or t/ day</td>
            </tr>
            <tr>
                <th>Percentage of recycled/reused materials per day</th>
                <td>materialrec*100/material</td>
                <td>%</td>
            </tr>
            <tr>
                <th rowspan='8'>Pollution and Waste Management</th>
                <th rowspan='1'>Greenhouse gas emission <GiIcons.GiGreenhouse/></th>
                <th>Amount of greenhouse gas emission per day</th>
                <td>ghg</td>
                <td>tonnes of CO2e/ day</td>
            </tr>
            <tr>
                <th rowspan='3'>Pollution management <GiIcons.GiChemicalDrop/></th>
                <th>Amount of water pollution per day</th>
                <td>waterpol</td>
                <td>m3/ day</td>
            </tr>
            <tr>
                <th>Amount of soil pollution per day</th>
                <td>soilpol</td>
                <td>kg or t/ day</td>
            </tr>
            <tr>
                <th>Amount of air emission (NOx, SOx) per day</th>
                <td>air</td>
                <td>t/ day</td>
            </tr>
            <tr>
                <th rowspan='1'>Use and release of hazardous materials<GiIcons.GiNuclearWaste/></th>
                <th>Amount of hazardous materials used per day</th>
                <td>hazmat</td>
                <td>kg or t/ day</td>
            </tr>
            <tr>
                <th rowspan='2'>Waste management<GiIcons.GiTrashCan/></th>
                <th>Amount of solid waste generated per day</th>
                <td>soilwaste</td>
                <td>kg or t/ day</td>
            </tr>
            <tr>
                <th>Amount of waste water generated per day</th>
                <td>waterwaste</td>
                <td>m3/ day</td>
            </tr>
            <tr>
                <th rowspan='1'>Product recyclability</th>
                <th>Is the product produced recyclable/reusable?</th>
                <td>productrec</td>
                <td></td>
            </tr>
            <tr>
                <th rowspan='5'>Operations Management and Performance Measurement</th>
                <th rowspan='1'>Environmental management system (ISO 14001)</th>
                <th>Existence of external certifications regarding environmental standards</th>
                <td>envirostand</td>
                <td></td>
            </tr>
            <tr>
                <th rowspan='2'>Reverse logistics systems</th>
                <th>Is there reverse logistics system?</th>
                <td>reverse</td>
                <td></td>
            </tr>
            <tr>
                <th>Type of reverse logistics </th>
                <td>reversetype</td>
                <td></td>
            </tr>
            <tr>
                <th rowspan='1'>Cleaner technology</th>
                <th>Type of clean technology used</th>
                <td>clean</td>
                <td></td>
            </tr>
            <tr>
                <th rowspan='1'>Supplier sustainability assessment</th>
                <th>Percentage of suppliers monitored on environmental sustainability</th>
                <td>envirosus*100/suppliers</td>
                <td>%</td>
            </tr>
      </tbody>
      </table>
    </div>
    </div>
    </>
  )
}

export default EnviroIndicators