import React, { useState, useEffect} from 'react'
import Assessment from "../../abis/Assessments.json"
import Web3 from "web3"
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../Sidebar';
import {useLocation} from 'react-router-dom';

const AssessList = ({assessments, energy, material, process}) =>
assessments.map(a => (
    <tr key={a.id}>
      <table className='lca-table'>
      <caption>Life Cycle Inventory for {process}</caption>
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
</tr>
))

const AssessLCI = () => {
    useEffect(() => { 
        const loadWeb3 = async () => {
            if(window.ethereum) {
              window.web3 = new Web3(window.ethereum)
              await window.ethereum.enable()
            } if (window.web3) {
              window.web3 = new Web3(window.web3.currentProvider)
            } else {
              window.alert("Please use Metamask!")
            }
        }
        loadWeb3()}, [])

    useEffect(() => { 
      const loadBlockchainData = async () => {
          const web3 = window.web3
          const accounts = await web3.eth.getAccounts()
          setAccount(accounts[0])
          const networkId = await web3.eth.net.getId()
          const networkData = Assessment.networks[networkId]
          if (networkData) {
              //Fetch contract
              const contract = new web3.eth.Contract(Assessment.abi, networkData.address)
              setContract(contract)
              const LCACount = await contract.methods.LCACount().call()
              setLCACount(LCACount)
              //Load LCAs
              for (var i = 1; i <= LCACount; i++) {
                  const newLCA = await contract.methods.LCAs(i).call()
                  setLCAs(LCAs =>([...LCAs, newLCA]))
              }
              for (var i = 1; i <= LCACount; i++) {
                  const newLCA = await contract.methods.LCAs(i).call()
                  setForm(LCAs =>([...LCAs, JSON.parse(newLCA.document)]))
              }
              for (var i = 1; i <= LCACount; i++) {
                  const newLCA = await contract.methods.LCAs(i).call()
                  const parse = JSON.parse(newLCA.document)
                  setEnergy(LCAs =>([...LCAs, (parse.energy)]))
                  setMaterial(LCAs =>([...LCAs, (parse.material)]))
              }
              }
          else { 
              window.alert("Assessment contract is not deployed to the detected network")
          }
      }
      loadBlockchainData()}, [])

    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [LCACount, setLCACount] = useState()
    const [LCAs, setLCAs] = useState([])        
    const [form, setForm] = useState([])
    const [energy, setEnergy] = useState([])
    const [material, setMaterial] = useState([])
    const [process, setProcess] = useState()


    const merge = (LCAs.map(t1 => ({...t1, ...form.find(t2 => t2.id === t1.id)})))
    const assess = merge.filter(obj => obj.process.includes(process)).map(obj => (obj));
    const lastAssess = assess.slice(-1)

    const location = useLocation();
    const processData = location.state;

    useEffect(() => {
        setProcess(processData)
        console.log(processData)
    }, [processData])


  return (
    <>
    <Sidebar/>
        <div className='margin'>
        <table className="assess-table">
          {lastAssess !== "" ? <AssessList assessments={lastAssess} process={process} 
          energy={energy} material={material}/>: <h2> No Assessment Found</h2>}
        </table>
      </div>
    </>
  )
}

export default AssessLCI