import React from 'react'
import { FcDocument } from "react-icons/fc";
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';

const AssessList = ({assessments, handleClick, showForm}) =>
assessments.sort((a,b) => b.id - a.id)
.map(a => (
    <tr key={a.id}>
    <td className="p-name">{a.assessType}</td>
    <td className="p-name"><FcDocument
      style={{ fontSize: "30px", cursor: "pointer" }}
      onClick={() => handleClick(a.id)} /></td>
    <td className="p-comp">{a.date}</td>
    <td className="p-comp">
    {a.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier":
    a.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company":
    a.account === "0xf5D0a9A8cCC008Bc72c6e708F5A7871d094B7E11" ? "Customer": a.account}
    </td>
{showForm[a.id] ? 
    <div className='lca-indicators'>
      <AiIcons.AiOutlineClose style={{ fontSize: "20px", cursor: "pointer" }}
      onClick={() => handleClick(a.id)}/>
      <table className='lca-table'>
      <caption>Life Cycle Assessment Indicators</caption>
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
        <td>{a.energy/a.batch}</td>
        <td>kWh/ unit of product</td>
    </tr>
    <tr>
        <th rowspan="2">Energy efficiency <MdIcons.MdPowerOff/></th>
        <th>Amount of reduced energy per unit of product</th>
        <td>{a.energyred/a.batch}</td>
        <td>kWh/ unit of product</td>
    </tr>
    <tr>
        <th>Percentage of energy reduced per unit of product</th>
        <td>{a.energyred*100/a.energy}</td>
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
        <td>{a.renewenergy/a.batch}</td>
        <td>kWh/ unit of product</td>
    </tr> 
    <tr>
        <th>Percentage of renewable energy used per unit of product</th>
        <td>{a.renewenergy*100/a.energy}</td>
        <td>%</td>
    </tr>
    <tr>
        <th rowspan='1'>Water consumption <GiIcons.GiWaterDrop/></th>
        <th>Amount of water consumption per unit of product</th>
        <td>{a.water/a.batch}</td>
        <td>m3/ unit of product</td>
    </tr>
    <tr>
        <th rowspan='2'>Recycled/reused water <GiIcons.GiWaterRecycling/></th>
        <th>Amount of recycled/reused water per unit of product</th>
        <td>{a.waterrec/a.batch}</td>
        <td>m3/ unit of product</td>
    </tr>
    <tr>
        <th>Percentage of recycled/reused water per unit of product</th>
        <td>{a.waterrec*100/a.water}</td>
        <td>%</td>
    </tr>
    <tr>
        <th rowspan='1'>Material consumption <AiIcons.AiFillGold/><AiIcons.AiFillGold/></th>
        <th>Amount of materials other than water used per unit of product</th>
        <td>{a.material/a.batch}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th rowspan='2'>Material efficiency <AiIcons.AiFillGold/></th>
        <th>Amount of reduced materials per unit of product</th>
        <td>{a.materialred/a.batch}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th>Percentage of reduced materials per unit of product</th>
        <td>{a.materialred*100/a.material}</td>
        <td>%</td>
    </tr>
    <tr>
        <th rowspan='2'>Recycled/reused materials <BiIcons.BiRecycle/></th>
        <th>Amount of recycled/reused materials per unit of product</th>
        <td>{a.materialrec/a.batch}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th>Percentage of recycled/reused materials per unit of product</th>
        <td>{a.materialrec*100/a.material}</td>
        <td>%</td>
    </tr>
    <tr>
        <th rowspan='1'>Greenhouse gas emission <GiIcons.GiGreenhouse/></th>
        <th>Amount of greenhouse gas emission per unit of product</th>
        <td>{a.ghg/a.batch}</td>
        <td>tonnes of CO2e/ unit of product</td>
    </tr>
    <tr>
        <th rowspan='3'>Pollution management <GiIcons.GiChemicalDrop/></th>
        <th>Amount of water pollution per unit of product</th>
        <td>{a.waterpol/a.batch}</td>
        <td>m3/ unit of product</td>
    </tr>
    <tr>
        <th>Amount of soil pollution per unit of product</th>
        <td>{a.soilpol/a.batch}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th>Amount of air emission (NOx, SOx) per unit of product</th>
        <td>{a.air/a.batch}</td>
        <td>t/ unit of product</td>
    </tr>
    <tr>
        <th rowspan='1'>Use and release of hazardous materials <GiIcons.GiNuclearWaste/></th>
        <th>Amount of hazardous materials used per unit of product</th>
        <td>{a.hazmat/a.batch}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th rowspan='2'>Waste management <GiIcons.GiTrashCan/></th>
        <th>Amount of solid waste generated per unit of product</th>
        <td>{a.soilwaste/a.batch}</td>
        <td>kg or t/ unit of product</td>
    </tr>
    <tr>
        <th>Amount of waste water generated per unit of product</th>
        <td>{a.waterwaste/a.batch}</td>
        <td>m3/ unit of product</td>
    </tr> 
    </tbody>
    </table> 
    </div>: ""}
    </tr>
))

const Assessment = ({assessments, handleClick, showForm}) => {
  return (
    <>
    <h3 className="orderTitle">Assessments</h3>
        <table className="table">
          <tr>
            <th>Assessment Type</th> 
            <th>Document</th>
            <th>Date / Time</th>
            <th>User Account</th>
          </tr>
          <AssessList assessments={assessments} handleClick={handleClick} showForm={showForm} />
      </table>

    </>

  )
}

export default Assessment