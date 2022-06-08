import React, { useState, useEffect} from 'react'
import Assessment from "../../abis/Assessments.json"
import Web3 from "web3"
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../Sidebar';
import {useLocation} from 'react-router-dom';

const AssessList = ({assessments}) =>
assessments.map(a => (
    <tr key={a.id}>
      <table className='LCI-table'>
      <caption>Life Cycle Inventory of {a.process} of a {a.product}</caption>
      <caption className='captwo'>{"For period " + a.month + " " + a.year + " by "} 
      {a.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? " Supplier#1":
      a.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? " Supplier#2":
      a.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? " Supplier#3":
      a.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? " Supplier#4":
      a.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? " Company": a.account}</caption>
      <thead>
          <th>Categories</th>
          <th>Indicators</th>
          <th>Measurements</th>
          <th>Values</th>
          <th>Units</th>
      </thead>
      <tbody>
            <tr>
                <th rowspan='11' className='category'>Natural Resources</th>
                <th rowspan='1'>Energy consumption <GiIcons.GiElectric/></th>
                <th>Amount of energy used per unit of product</th>
                <td>{(a.energy/a.batch) % 1 !== 0 ? (a.energy/a.batch).toFixed(2): (a.energy/a.batch)}</td>
                <td>kWh/ unit of product</td>
            </tr>
            <tr>
                <th rowspan='2'>Renewable energy <GiIcons.GiWindTurbine/></th>
                <th>Amount of renewable energy used in energy consumption per unit of product</th>
                <td>{(a.renewenergy/a.batch) % 1 !== 0 ? (a.renewenergy/a.batch).toFixed(2): (a.renewenergy/a.batch)}</td>
                <td>kWh/ unit of product</td>
            </tr> 
            <tr>
                <th>Percentage of renewable energy used per unit of product</th>
                <td>{(a.renewenergy*100/a.energy) % 1 !== 0 ? (a.renewenergy*100/a.energy).toFixed(2): (a.renewenergy*100/a.energy)}</td>
                <td>%</td>
            </tr>
            <tr>
                <th rowspan='1'>Water consumption <GiIcons.GiWaterDrop/></th>
                <th>Amount of water used per unit of product</th>
                <td>{(a.water/a.batch) % 1 !== 0 ? (a.water/a.batch).toFixed(2): (a.water/a.batch)}</td>
                <td>m3/ unit of product</td>
            </tr>
            <tr>
                <th rowspan='2'>Recycled or reused water <GiIcons.GiWaterRecycling/></th>
                <th>Amount of recycled or reused water used in water consumption per unit of product</th>
                <td>{ (a.waterrec/a.batch) % 1 !== 0 ? (a.waterrec/a.batch).toFixed(2): (a.waterrec/a.batch)}</td>
                <td>m3/ unit of product</td>
            </tr>
            <tr>
                <th>Percentage of recycled or reused water per unit of product</th>
                <td>{(a.waterrec*100/a.water) % 1 !== 0 ? (a.waterrec*100/a.water).toFixed(2): (a.waterrec*100/a.water)}</td>
                <td>%</td>
            </tr>
            <tr>
                <th rowspan='1'>Material consumption <AiIcons.AiFillGold/><AiIcons.AiFillGold/></th>
                <th>Amount of materials other than water used per unit of product</th>
                <td>{(a.material/a.batch) % 1 !== 0 ? (a.material/a.batch).toFixed(2): (a.material/a.batch)}</td>
                <td>kg/ unit of product</td>
            </tr>
            <tr>
                <th rowspan='2'>Recycled or reused materials <BiIcons.BiRecycle/></th>
                <th>Amount of recycled or reused materials used in material consumption per unit of product</th>
                <td>{(a.materialrec/a.batch) % 1 !== 0 ? (a.materialrec/a.batch).toFixed(2): (a.materialrec/a.batch)}</td>
                <td>kg/ unit of product</td>
            </tr>
            <tr>
                <th>Percentage of recycled or reused materials per unit of product</th>
                <td>{(a.materialrec*100/a.material) % 1 !== 0 ? (a.materialrec*100/a.material).toFixed(2): (a.materialrec*100/a.material)}</td>
                <td>%</td>
            </tr>
            <tr>
                <th rowspan='1'>Product recyclability<RiIcons.RiRecycleFill/></th>
                <th>Whether the product produced is recyclable or reusable</th>
                <td>{a.productrec}</td>
                <td></td>
            </tr>
            <tr>
                <th rowspan='1'>Green packaging and labeling<BiIcons.BiPackage/></th>
                <th>Whether the product has eco-friendly packaging and labeling</th>
                <td>{a.ecolabel}</td>
                <td></td>
            </tr>
            <tr>
                <th rowspan='16' className='category'>Pollution and Waste Management</th>
                <th rowspan='1'>Greenhouse gas emission <GiIcons.GiGreenhouse/></th>
                <th>Amount of greenhouse gas emission generated per unit of product</th>
                <td>{(a.ghg/a.batch) % 1 !== 0 ? (a.ghg/a.batch).toFixed(2): (a.ghg/a.batch)}</td>
                <td>tonnes of CO2e/ unit of product</td>
            </tr>
            <tr>
                <th rowspan='5'>Pollution management <GiIcons.GiChemicalDrop/></th>
                <th>Amount of water pollution generated per unit of product</th>
                <td>{(a.waterpol/a.batch) % 1 !== 0 ? (a.waterpol/a.batch).toFixed(2): (a.waterpol/a.batch)}</td>
                <td>m3/ unit of product</td>
            </tr>
            <tr>
                <th>Type of water pollution</th>
                <td>{(a.waterpoltype + " ").replace(/,/g, ', ')}</td>
                <td></td>
            </tr>
            <tr>
                <th>Amount of land pollution generated per unit of product</th>
                <td>{(a.landpol/a.batch) % 1 !== 0 ? (a.landpol/a.batch).toFixed(2): (a.landpol/a.batch)}</td>
                <td>m2/ unit of product</td>
            </tr>
            <tr>
                <th>Type of land pollution</th>
                <td>{(a.landpoltype + " ").replace(/,/g, ', ')}</td>
                <td></td>
            </tr>
            <tr>
                <th>Amount of air emission generated per unit of product</th>
                <td>{(a.air/a.batch) % 1 !== 0 ? (a.air/a.batch).toFixed(2): (a.air/a.batch)}</td>
                <td>tonnes/ unit of product</td>
            </tr>
            <tr>
                <th rowspan='1'>Use and release of hazardous materials <GiIcons.GiNuclearWaste/></th>
                <th>Amount of hazardous materials used per unit of product</th>
                <td>{(a.hazmat/a.batch) % 1 !== 0 ? (a.hazmat/a.batch).toFixed(2): (a.hazmat/a.batch)}</td>
                <td>kg/ unit of product</td>
            </tr>
            <tr>
                <th rowspan='9'>Waste management <GiIcons.GiTrashCan/></th>
                <th>Amount of hazardous waste generated per unit of product</th>
                <td>{(a.hazwaste/a.batch) % 1 !== 0 ? (a.hazwaste/a.batch).toFixed(2): (a.hazwaste/a.batch)}</td>
                <td>kg/ unit of product</td>
            </tr>
            <tr>
                <th>Amount of solid waste generated per unit of product</th>
                <td>{(a.solidwaste/a.batch) % 1 !== 0 ? (a.solidwaste/a.batch).toFixed(2): (a.solidwaste/a.batch)}</td>
                <td>kg/ unit of product</td>
            </tr>
            <tr>
                <th>Amount of solid waste recycled or reused per unit of product</th>
                <td>{(a.solidwasterec/a.batch) % 1 !== 0 ? (a.solidwasterec/a.batch).toFixed(2): (a.solidwasterec/a.batch)}</td>
                <td>kg/ unit of product</td>
            </tr>
            <tr>
                <th>Percentage of solid waste recycled or reused per unit of product</th>
                <td>{(a.solidwasterec/a.solidwaste) % 1 !== 0 ? (a.solidwasterec/a.solidwaste).toFixed(2): (a.solidwasterec/a.solidwaste)}</td>
                <td>%</td>
            </tr>
            <tr>
                <th>Type of solid waste destination </th>
                <td>{(a.solidwastedes + " ").replace(/,/g, ', ')}</td>
                <td></td>
            </tr>
            <tr>
                <th>Amount of waste water generated per unit of product</th>
                <td>{(a.waterwaste/a.batch) % 1 !== 0 ? (a.waterwaste/a.batch).toFixed(2): (a.waterwaste/a.batch)}</td>
                <td>m3/ unit of product</td>
            </tr>
            <tr>
                <th>Amount of waste water recycled or reused per unit of product</th>
                <td>{(a.waterwasterec/a.batch) % 1 !== 0 ? (a.waterwasterec/a.batch).toFixed(2): (a.waterwasterec/a.batch)}</td>
                <td>m3/ unit of product</td>
            </tr>
            <tr>
                <th>Percentage of waste water recycled or reused per unit of product</th>
                <td>{(a.waterwasterec/a.waterwaste) % 1 !== 0 ? (a.waterwasterec/a.waterwaste).toFixed(2): (a.waterwasterec/a.waterwaste)}</td>
                <td>%</td>
            </tr>
            <tr>
                <th>Type of waste water destination </th>
                <td>{(a.waterwastedes + " ").replace(/,/g, ', ')}</td>
                <td></td>
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
          const networkId = await web3.eth.net.getId()
          const networkData = Assessment.networks[networkId]
          if (networkData) {
              //Fetch contract
              const contract = new web3.eth.Contract(Assessment.abi, networkData.address)
              const LCICount = await contract.methods.LCICount().call()
              //Load LCIs
              for (var i = 1; i <= LCICount; i++) {
                  const newLCI = await contract.methods.LCIs(i).call()
                  setLCIs(LCIs =>([...LCIs, newLCI]))
              }
              for (var i = 1; i <= LCICount; i++) {
                  const newLCI = await contract.methods.LCIs(i).call()
                  setForm(LCIs =>([...LCIs, JSON.parse(newLCI.document)]))
              }
              }
          else { 
              window.alert("Assessment contract is not deployed to the detected network")
          }
      }
      loadBlockchainData()}, [])

    const [LCIs, setLCIs] = useState([])        
    const [form, setForm] = useState([])
    const [process, setProcess] = useState()
    const [product, setProduct] = useState()

    const merge = (LCIs.map(t1 => ({...t1, ...form.find(t2 => t2.id === t1.id)})))
    const assess = merge.filter(obj => obj.process.includes(process)).map(obj => (obj)).filter(obj => obj.id.includes(product)).map(obj => (obj))
    const lastAssess = assess.slice(-1)

    const location = useLocation();
    const processData = location.state.process;
    const productData = location.state.product;

    useEffect(() => {
        setProcess(processData)
        setProduct(productData)
        console.log(processData)
        console.log(productData)
    }, [processData, productData])


  return (
    <>
    <Sidebar/>
        <div className='margin'>
        <table className="assess-table">
          <AssessList assessments={lastAssess} process={process}/>
          {lastAssess.length === 0 ? <h3> No Assessment Found</h3> : null}
        </table>
      </div>
    </>
  )
}

export default AssessLCI