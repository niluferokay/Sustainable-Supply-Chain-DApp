import React from 'react'
import { FcDocument } from "react-icons/fc";
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';
import * as FaIcons from 'react-icons/fa';

const AssessList = ({assessments, energy, material, handleClick, showForm}) =>
assessments.sort((a,b) => b.id - a.id)
.map(a => (
    <tr key={a.id}>
    <td className="p-name"><FcDocument
      style={{ fontSize: "30px", cursor: "pointer" }}
      onClick={() => handleClick(a.id)} /></td>
    <td className="p-comp">
        {a.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier#1":
        a.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Supplier#2":
        a.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? "Supplier#3":
        a.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? "Supplier#4":
        a.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company":
        a.account === "0xf5D0a9A8cCC008Bc72c6e708F5A7871d094B7E11" ? "Customer": a.account}
    </td> 
    <td className="p-comp">{a.month + " " + a.year}</td>
    <td className="p-comp">{a.date}</td> 
{showForm[a.id] ? 
    <div className='lca-indicators'>
        <AiIcons.AiOutlineClose className='lca-x'
        onClick={() => handleClick(a.id)}/>
        <table className='lca-table'>
        <caption>Enviromental Assessment of {a.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier#1":
        a.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Supplier#2":
        a.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? "Supplier#3":
        a.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? "Supplier#4":
        a.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company": a.account}
        </caption>
        <thead>
            {/* <th>Categories</th> */}
            <th>Indicators</th>
            <th>Measurements</th>
            <th>Values</th>
            <th>Units</th>
        </thead>
        <tbody>
                <tr>
                    {/* <th rowspan='17' className='category'>Natural Resources</th> */}
                    <th rowspan='1'>Energy consumption <GiIcons.GiElectric/></th>
                    <th>Amount of energy consumption </th>
                    <td>{a.energy}</td>
                    <td>kWh</td>
                </tr>
                <tr>
                    <th rowspan="2">Energy efficiency <MdIcons.MdPowerOff/></th>
                    <th>Amount of reduced energy </th>
                    <td>{a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? (energy[a.id-2] - energy[a.id-1]) : null}</td>
                    <td>kWh</td>
                </tr>
                <tr>
                    <th>Percentage of energy reduced </th>
                    <td>{(a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null) % 1 !== 0 ? 
                    (a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null).toFixed(1): 
                    (a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null)}</td>
                    <td>%</td>
                </tr> 
                <tr>
                    <th rowspan='3'>Renewable energy <GiIcons.GiWindTurbine/></th>
                    <th>Type of renewable energy used</th>
                    <td>{a.renewenergytype + " "}</td>            
                    <td></td>
                </tr>  
                <tr>
                    <th>Amount of renewable energy used </th>
                    <td>{a.renewenergy}</td>
                    <td>kWh</td>
                </tr> 
                <tr>
                    <th>Percentage of renewable energy used </th>
                    <td>{(a.renewenergy*100/a.energy) % 1 !== 0 ? (a.renewenergy*100/a.energy).toFixed(1): (a.renewenergy*100/a.energy)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Water consumption <GiIcons.GiWaterDrop/></th>
                    <th>Amount of water consumption </th>
                    <td>{a.water}</td>
                    <td>m3</td>
                </tr>
                <tr>
                    <th rowspan='2'>Recycled or reused water <GiIcons.GiWaterRecycling/></th>
                    <th>Amount of recycled or reused water </th>
                    <td>{a.waterrec}</td>
                    <td>m3</td>
                </tr>
                <tr>
                    <th>Percentage of recycled or reused water </th>
                    <td>{(a.waterrec*100/a.water) % 1 !== 0 ? (a.waterrec*100/a.water).toFixed(1): (a.waterrec*100/a.water)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Material consumption <AiIcons.AiFillGold/><AiIcons.AiFillGold/></th>
                    <th>Amount of materials other than water used </th>
                    <td>{a.material}</td>
                    <td>kg or t</td>
                </tr>
                <tr>
                    <th rowspan='2'>Material efficiency <AiIcons.AiFillGold/></th>
                    <th>Amount of reduced materials </th>
                    <td>{a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? (material[a.id-2] - material[a.id-1]) : null}</td>
                    <td>kg or t</td>
                </tr>
                <tr>
                    <th>Percentage of reduced materials </th>
                    <td>{(a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null) % 1 !== 0 ? 
                    (a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null).toFixed(1): 
                    (a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='2'>Recycled or reused materials <BiIcons.BiRecycle/></th>
                    <th>Amount of recycled or reused materials </th>
                    <td>{a.materialrec}</td>
                    <td>kg or t</td>
                </tr>
                <tr>
                    <th>Percentage of recycled or reused materials </th>
                    <td>{(a.materialrec*100/a.material) % 1 !== 0 ? (a.materialrec*100/a.material).toFixed(1): (a.materialrec*100/a.material)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Land use<GiIcons.GiFactory/></th>
                    <th>Amount of land owned, leased, or managed for production activities or extractive use</th>
                    <td>{a.land}</td>
                    <td>kg or t</td>
                </tr>
                <tr>
                    <th rowspan='2'>Biodiversity<GiIcons.GiCircleForest/></th>
                    <th>Is there a biodiversity policy per facility?</th>
                    <td>{a.bio}</td>
                    <td>kg or t</td>
                </tr>
                <tr>
                    <th>Are there activities and operations on protected and sensitive areas per facility? (e.g., IUCN protected area categories 1–4, world heritage sites, and biosphere reserves)</th>
                    <td>{a.sensitive}</td>
                    <td>%</td>
                </tr>
                <tr>
                    {/* <th rowspan='8' className='category'>Pollution and Waste Management</th> */}
                    <th rowspan='1'>Greenhouse gas emission <GiIcons.GiGreenhouse/></th>
                    <th>Amount of greenhouse gas emission </th>
                    <td>{a.ghg}</td>
                    <td>tonnes of CO2e</td>
                </tr>
                <tr>
                    <th rowspan='3'>Pollution management <GiIcons.GiChemicalDrop/></th>
                    <th>Amount of water pollution </th>
                    <td>{a.waterpol}</td>
                    <td>m3</td>
                </tr>
                <tr>
                    <th>Amount of soil pollution </th>
                    <td>{a.soilpol}</td>
                    <td>kg or t</td>
                </tr>
                <tr>
                    <th>Amount of air emission (NOx, SOx) </th>
                    <td>{a.air}</td>
                    <td>t</td>
                </tr>
                <tr>
                    <th rowspan='1'>Use and release of hazardous materials<GiIcons.GiNuclearWaste/></th>
                    <th>Amount of hazardous materials used </th>
                    <td>{a.hazmat}</td>
                    <td>kg or t</td>
                </tr>
                <tr>
                    <th rowspan='2'>Waste management<GiIcons.GiTrashCan/></th>
                    <th>Amount of solid waste generated </th>
                    <td>{a.soilwaste}</td>
                    <td>kg or t</td>
                </tr>
                <tr>
                    <th>Amount of waste water generated </th>
                    <td>{a.waterwaste}</td>
                    <td>m3</td>
                </tr>
                <tr>
                    <th rowspan='1'>Product recyclability<RiIcons.RiRecycleFill/></th>
                    <th>Is the product produced recyclable/reusable?</th>
                    <td>{a.productrec}</td>
                    <td></td>
                </tr>
                <tr>
                    {/* <th rowspan='5' className='category'>Operations Management and Performance Measurement</th> */}
                    <th rowspan='1'>Environmental management system<GrIcons.GrCertificate/></th>
                    <th>Existence of external certifications regarding environmental standards</th>
                    <td>{a.envirostand}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='2'>Reverse logistics systems<AiIcons.AiOutlineArrowLeft/><FaIcons.FaTruckMoving/></th>
                    <th>Is there reverse logistics system?</th>
                    <td>{a.reverse}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Type of reverse logistics </th>
                    <td>{a.reversetype + " "}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='1'>Cleaner technology<FaIcons.FaSeedling/></th>
                    <th>Type of clean technology used</th>
                    <td>{a.clean + " "}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='1'>Supplier sustainability assessment<MdIcons.MdOutlineAssessment/></th>
                    <th>Percentage of suppliers monitored on environmental sustainability</th>
                    <td>{(a.envirosus*100/a.suppliers) % 1 !== 0 ? (a.envirosus*100/a.suppliers).toFixed(1): (a.envirosus*100/a.suppliers)}</td>
                    <td>%</td>
                </tr>
        </tbody>
        </table>
        </div>: ""}
        </tr>
))

const Enviro = ({Emerge, energy, material, EClick, showEForm}) => {
    
  return (
    <>
    <h3 className="table-title">Environmental Sustainability Assessments</h3>
      <table className="assess-table">
          <tr>
            <th className='assess'>Assessment</th>
            <th className='user'>User</th>
            <th className='period'>Period (Month  Year)</th>
            <th>Date  Time Added</th>
          </tr>
          <AssessList assessments={Emerge} energy={energy} material={material} handleClick={EClick} showForm={showEForm} />
      </table>
    </>
  )
}

export default Enviro