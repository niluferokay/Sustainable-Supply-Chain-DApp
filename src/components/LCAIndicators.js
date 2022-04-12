import React, { useState, useEffect} from 'react'
import { FcDocument } from "react-icons/fc";
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';

const AssessList = ({assessments, energy, material, handleClick, showForm}) =>
assessments.sort((a,b) => b.id - a.id)
.map(a => (
    <tr key={a.id}>
    <td className="p-name"><FcDocument
      style={{ fontSize: "30px", cursor: "pointer" }}
      onClick={() => handleClick(a.id)} /></td>
    <td className="p-comp">{a.product}</td>
    <td className="p-comp">{a.process}</td>
    <td className="p-comp">{a.month + " " + a.year}</td>
    <td className="p-comp">
        {a.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier#1":
        a.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Supplier#2":
        a.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company":
        a.account === "0xf5D0a9A8cCC008Bc72c6e708F5A7871d094B7E11" ? "Customer": a.account}
    </td>  
    <td className="p-comp">{a.date}</td>
{showForm[a.id] ? 
    <div className='lca-indicators'>
      <AiIcons.AiOutlineClose className='lca-x'
      onClick={() => handleClick(a.id)}/>
      <table className='lca-table'>
      <caption>Life Cycle Inventory of {a.product}</caption>
      <thead>
          <th>Indicators</th>
          <th>Measurements</th>
          <th>Values</th>
          <th>Units</th>
      </thead>
      <tbody>
    <tr>
        <th rowspan='1'>Energy consumption <GiIcons.GiElectric/></th>
        <th>Amount of energy consumption per unit of product</th>
        <td>{(a.energy/a.batch) % 1 !== 0 ? (a.energy/a.batch).toFixed(1): (a.energy/a.batch)}</td>
        <td>kWh/ unit of product</td>
    </tr>
    <tr>
        <th rowspan="2">Energy efficiency <MdIcons.MdPowerOff/></th>
        <th>Amount of reduced energy per unit of product</th>
        <td>{a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])/a.batch) : null}</td>
        <td>kWh/ unit of product</td>
    </tr>
    <tr>
        <th>Percentage of energy reduced per unit of product</th>
        <td>{(a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null) % 1 !== 0 ? 
        (a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null).toFixed(1): 
        (a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null)}</td>
        <td>%</td>
    </tr>
    <tr>
        <th rowspan='3'>Renewable energy <GiIcons.GiWindTurbine/></th>
        <th>Type of renewable energy used in product production </th>
        <td>{a.renewenergytype}</td>            
        <td></td>
    </tr>  
    <tr>
        <th>Amount of renewable energy used per unit of product</th>
        <td>{(a.renewenergy/a.batch) % 1 !== 0 ? (a.renewenergy/a.batch).toFixed(1): (a.renewenergy/a.batch)}</td>
        <td>kWh/ unit of product</td>
    </tr> 
    <tr>
        <th>Percentage of renewable energy used per unit of product</th>
        <td>{(a.renewenergy*100/a.energy) % 1 !== 0 ? (a.renewenergy*100/a.energy).toFixed(1): (a.renewenergy*100/a.energy)}</td>
        <td>%</td>
    </tr>
    <tr>
        <th rowspan='1'>Water consumption <GiIcons.GiWaterDrop/></th>
        <th>Amount of water consumption per unit of product</th>
        <td>{(a.water/a.batch) % 1 !== 0 ? (a.water/a.batch).toFixed(1): (a.water/a.batch)}</td>
        <td>m3/ unit of product</td>
    </tr>
    <tr>
        <th rowspan='2'>Recycled/reused water <GiIcons.GiWaterRecycling/></th>
        <th>Amount of recycled/reused water per unit of product</th>
        <td>{ (a.waterrec/a.batch) % 1 !== 0 ? (a.waterrec/a.batch).toFixed(1): (a.waterrec/a.batch)}</td>
        <td>m3/ unit of product</td>
    </tr>
    <tr>
        <th>Percentage of recycled/reused water per unit of product</th>
        <td>{(a.waterrec*100/a.water) % 1 !== 0 ? (a.waterrec*100/a.water).toFixed(1): (a.waterrec*100/a.water)}</td>
        <td>%</td>
    </tr>
    <tr>
        <th rowspan='1'>Material consumption <AiIcons.AiFillGold/><AiIcons.AiFillGold/></th>
        <th>Amount of materials other than water used per unit of product</th>
        <td>{(a.material/a.batch) % 1 !== 0 ? (a.material/a.batch).toFixed(1): (a.material/a.batch)}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th rowspan='2'>Material efficiency <AiIcons.AiFillGold/></th>
        <th>Amount of reduced materials per unit of product</th>
        <td>{a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])/a.batch) : null}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th>Percentage of reduced materials per unit of product</th>
        <td>{(a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null) % 1 !== 0 ? 
        (a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null).toFixed(1): 
        (a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null)}</td>
        <td>%</td>
    </tr>
    <tr>
        <th rowspan='2'>Recycled/reused materials <BiIcons.BiRecycle/></th>
        <th>Amount of recycled/reused materials per unit of product</th>
        <td>{(a.materialrec/a.batch) % 1 !== 0 ? (a.materialrec/a.batch).toFixed(1): (a.materialrec/a.batch)}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th>Percentage of recycled/reused materials per unit of product</th>
        <td>{(a.materialrec*100/a.material) % 1 !== 0 ? (a.materialrec*100/a.material).toFixed(1): (a.materialrec*100/a.material)}</td>
        <td>%</td>
    </tr>
    <tr>
        <th rowspan='1'>Greenhouse gas emission <GiIcons.GiGreenhouse/></th>
        <th>Amount of greenhouse gas emission per unit of product</th>
        <td>{(a.ghg/a.batch) % 1 !== 0 ? (a.ghg/a.batch).toFixed(1): (a.ghg/a.batch)}</td>
        <td>tonnes of CO2e/ unit of product</td>
    </tr>
    <tr>
        <th rowspan='3'>Pollution management <GiIcons.GiChemicalDrop/></th>
        <th>Amount of water pollution per unit of product</th>
        <td>{(a.waterpol/a.batch) % 1 !== 0 ? (a.waterpol/a.batch).toFixed(1): (a.waterpol/a.batch)}</td>
        <td>m3/ unit of product</td>
    </tr>
    <tr>
        <th>Amount of soil pollution per unit of product</th>
        <td>{(a.soilpol/a.batch) % 1 !== 0 ? (a.soilpol/a.batch).toFixed(1): (a.soilpol/a.batch)}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th>Amount of air emission (NOx, SOx) per unit of product</th>
        <td>{(a.air/a.batch) % 1 !== 0 ? (a.air/a.batch).toFixed(1): (a.air/a.batch)}</td>
        <td>t/ unit of product</td>
    </tr>
    <tr>
        <th rowspan='1'>Use and release of hazardous materials <GiIcons.GiNuclearWaste/></th>
        <th>Amount of hazardous materials used per unit of product</th>
        <td>{(a.hazmat/a.batch) % 1 !== 0 ? (a.hazmat/a.batch).toFixed(1): (a.hazmat/a.batch)}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th rowspan='2'>Waste management <GiIcons.GiTrashCan/></th>
        <th>Amount of solid waste generated per unit of product</th>
        <td>{(a.soilwaste/a.batch) % 1 !== 0 ? (a.soilwaste/a.batch).toFixed(1): (a.soilwaste/a.batch)}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th>Amount of waste water generated per unit of product</th>
        <td>{(a.waterwaste/a.batch) % 1 !== 0 ? (a.waterwaste/a.batch).toFixed(1): (a.waterwaste/a.batch)}</td>
        <td>m3/ unit of product</td>
    </tr> 
    </tbody>
    </table> 
    </div>: ""}
    </tr>
))


const LCAIndicators = ({assessments, energy, material, handleClick, showForm}) => {
    
  return (
    <>
    <h3 className="table-title">Life Cycle Inventories</h3>
        <table className="assess-table">
          <tr>
            <th  className='lca-assess'>Assessment</th>
            <th className='lca-product'>Product</th>
            <th>Process</th>
            <th className='lca-period'>Period (Month  Year)</th>
            <th>User</th>
            <th>Date  Time Added</th>
          </tr>
          <AssessList assessments={assessments} energy={energy} material={material} handleClick={handleClick} showForm={showForm} />
      </table>
    </>
  )
}

export default LCAIndicators