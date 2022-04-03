import React, { useState, useEffect} from 'react'
import Assessment from "../../abis/Assessments.json"
import Web3 from "web3"
import * as GiIcons from 'react-icons/gi';
import * as BiIcons from 'react-icons/bi';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io';

import Sidebar from '../Sidebar';

const AssessList = ({assessments, energy, material}) =>
assessments.map(a => (
    <tr key={a.id}>
        <table className='lca-table'>
        <caption>Enviromental Indicators</caption>
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
</tr>
))

const SocialList = ({assessments}) =>
assessments.map(a => (
    <tr key={a.id}>
        <table className='lca-table'>
      <caption>Social Indicators</caption>
      <thead>
          <th>Categories</th>
          <th>Indicators</th>
          <th>Measurements</th>
          <th>Values</th>
          <th>Units</th>
      </thead>
      <tbody>
    <tr>
    <th rowspan='17'>Labor Practices</th>
    <th rowspan='2'>Employee training and development <MdIcons.MdOutlineSchool/></th>
      <th>Average training hours per employee per year</th>
      <td>{(a.trainh/a.trainemp) % 1 !== 0 ? (a.trainh/a.trainemp).toFixed(1): (a.trainh/a.trainemp)}</td>
      <td></td>
    </tr>
    <tr>
      <th>Percentage of employees trained per year</th>
      <td>{(a.trainemp*100/a.emp) % 1 !== 0 ? (a.trainemp*100/a.emp).toFixed(1): (a.trainemp*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Employee turnover<GrIcons.GrPowerCycle/></th>
      <th>Employee turnover per year</th>
      <td>{(a.resemp/a.hiredemp) % 1 !== 0 ? (a.resemp/a.hiredemp).toFixed(1): (a.resemp/a.hiredemp)}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='2'>Full and part-time employees<GrIcons.GrUserWorker/></th>
      <th>Percentage of full-time employees</th>
      <td>{(a.fullemp*100/a.emp) % 1 !== 0 ? (a.fullemp*100/a.emp).toFixed(1): (a.fullemp*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Percentage part-time employees</th>
      <td>{((a.emp-a.fullemp)*100) % 1 !== 0 ? ((a.emp-a.fullemp)*100).toFixed(1): ((a.emp-a.fullemp)*100)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='2'>Hours of work<AiIcons.AiOutlineClockCircle/></th>
      <th>Contractual working hours per employee per week</th>
      <td>{(a.workh/45) % 1 !== 0 ? (a.workh/45).toFixed(1): (a.workh/45)}</td>
      <td></td>
    </tr>
    <tr>
      <th>Overtime hours per employee per week</th>
      <td>{a.overtimeh}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='2'>Fair wage<MdIcons.MdAttachMoney/></th>
      <th>Percentage of employee wage to the minimum wage</th>
      <td>{(a.empwage*100/4250) % 1 !== 0 ? (a.empwage*100/4250).toFixed(1): (a.empwage*100/4250)}</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Percentage of full-time employees earning below minimum wage</th>
      <td>{(a.minwage*100/a.emp) % 1 !== 0 ? (a.minwage*100/a.emp).toFixed(1): (a.minwage*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Social benefits and security<MdIcons.MdSecurity/></th>
      <th>Percentage of employees entitled for health insurance, parental leave, unemployment, disability and invalidity coverage, retirement provision</th>
      <td>{(a.insurance*100/a.emp) % 1 !== 0 ? (a.insurance*100/a.emp).toFixed(1): (a.insurance*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='3'>Gender diversity<BsIcons.BsGenderAmbiguous/></th>
      <th>Wage diversity of genders</th>
      <td>{(a.femwage/a.malwage) % 1 !== 0 ? (a.femwage/a.malwage).toFixed(1): (a.femwage/a.malwage)}</td>
      <td></td>
    </tr>
    <tr>
      <th>Employee gender diversity</th>
      <td>{(a.fem/a.male) % 1 !== 0 ? (a.fem/a.male).toFixed(1): (a.fem/a.male)}</td>
      <td></td>
    </tr>
    <tr>
      <th>Percentage of female employees in board of directors and management positions</th>
      <td>{(a.femboard*100/a.empboard) % 1 !== 0 ? (a.femboard*100/a.empboard).toFixed(1): (a.femboard*100/a.empboard)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='3'>Diversity among the workforce<MdIcons.MdGroups/></th>
      <th>Percentage of disabled employees</th>
      <td>{(a.disabled*100/a.emp) % 1 !== 0 ? (a.disabled*100/a.emp).toFixed(1): (a.disabled*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Percentage of minority employees</th>
      <td>{(a.minority*100/a.emp) % 1 !== 0 ? (a.minority*100/a.emp).toFixed(1): (a.minority*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Percentage of employees with age over 65</th>
      <td>{(a.older*100/a.emp) % 1 !== 0 ? (a.older*100/a.emp).toFixed(1): (a.older*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Social standards <GrIcons.GrCertificate/></th>
      <th>Existence of external certifications regarding social standards</th>
      <td>{a.socialstand}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='6'>Work Health and Safety</th>
    <th rowspan='5'>Occupational health and safety<GiIcons.GiHealthNormal/></th>
      <th>Occupational health and safety compliance</th>
      <td>{a.ilo}</td>
      <td></td>
    </tr>
    <tr>
      <th>Existence of fire-fighting equipment and emergency exits </th>
      <td>{a.fire}</td>
      <td></td>
    </tr>
    <tr>
      <th>Provision of medical assistance and first aid </th>
      <td>{a.medical}</td>
      <td></td>
    </tr>
    <tr>
    <th>Access to drinking water and sanitation</th>
      <td>{a.sanitation}</td>
      <td></td>
    </tr>
    <tr>
    <th>Provision of protective gear</th>
      <td>{a.gear}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='1'>Accidents<MdIcons.MdOutlinePersonalInjury/></th>
      <th>Work accidents per year</th>
      <td>{a.workacc}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='7'>Human Rights</th>
    <th rowspan='2'>Freedom of association<GiIcons.GiThreeFriends/></th>
      <th>Presence of unions within the organization</th>
      <td>{a.union}</td>
      <td></td>
    </tr>
    <tr>
      <th>Percentage of employees joined to labor unions</th>
      <td>{(a.empunion*100/a.emp) % 1 !== 0 ? (a.empunion*100/a.emp).toFixed(1): (a.empunion*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Collective bargaining agreements<FaIcons.FaRegHandshake/></th>
      <th>Percentage of employees covered by collective bargaining agreements</th>
      <td>{(a.bargain*100/a.emp) % 1 !== 0 ? (a.bargain*100/a.emp).toFixed(1): (a.bargain*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Discrimination<GiIcons.GiInjustice/></th>
      <th>Discrimination incidents</th>
      <td>{a.discri}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='2'>Child and forced labor<GiIcons.GiCrossedChains/></th>
      <th>Child labor </th>
      <td>{a.child}</td>
      <td></td>
    </tr>
    <tr>
      <th>Forced labor</th>
      <td>{a.forced}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='1'>Rights of indigenous people<FaIcons.FaFeatherAlt/></th>
      <th>Violation of the rights of indigenous people</th>
      <td>{a.indig}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='6'>Society</th>
    <th rowspan='1'>Job localization<AiIcons.AiOutlineHome/><GrIcons.GrUserWorker/></th>
      <th>Percentage of local employees</th>
      <td>{(a.localemp*100/a.emp) % 1 !== 0 ? (a.localemp*100/a.emp).toFixed(1): (a.localemp*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Source localization<AiIcons.AiOutlineHome/><FiIcons.FiMapPin/></th>
      <th>Percentage of local suppliers</th>
      <td>{(a.localsup*100/a.suppliers) % 1 !== 0 ? (a.localsup*100/a.suppliers).toFixed(1): (a.localsup*100/a.suppliers)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Community development<FaIcons.FaSchool/><IoIcons.IoIosConstruct/></th>
      <th>Percentage of charity donations to earnings per year</th>
      <td>{(a.donation*100/a.earning) % 1 !== 0 ? (a.donation*100/a.earning).toFixed(1): (a.donation*100/a.earning)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='1'>Anti-corruption<GiIcons.GiPrisoner/></th>
      <th>Corruption incidents</th>
      <td>{a.corrup}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='1'>Anti-competitive behavior<GiIcons.GiPodiumWinner/></th>
      <th>Legal actions pending or completed regarding anti-competitive behavior</th>
      <td>{a.anticomp}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='1'>Supplier sustainability assessment<MdIcons.MdOutlineAssessment/></th>
      <th>Percentage of suppliers monitored on social sustainability</th>
      <td>{(a.socialsus*100/a.suppliers) % 1 !== 0 ? (a.socialsus*100/a.suppliers).toFixed(1): (a.socialsus*100/a.suppliers)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='5'>Customer Responsibility</th>
    <th rowspan='2'>Customer health and safety<MdIcons.MdHealthAndSafety/></th>
      <th>Percentage of products and services for which health and safety impacts are assessed</th>
      <td>{(a.productassess*100/a.product) % 1 !== 0 ? (a.productassess*100/a.product).toFixed(1): (a.productassess*100/a.product)}</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Health and safety incidents concerning products and services</th>
      <td>{a.productincident}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='2'>Respect for privacy<MdIcons.MdOutlinePrivacyTip/></th>
      <th>Customer privacy complaints</th>
      <td>{a.privacy}</td>
      <td></td>
    </tr>
    <tr>
      <th>Leaks, thefts, or losses of customer data</th>
      <td>{a.leaks}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='1'>Customer satisfaction<AiIcons.AiOutlineLike/></th>
      <th>Customer complaints</th>
      <td>{a.cuscomp}</td>
      <td></td>
    </tr>
      </tbody>
        </table>
        </tr>
))

const Company = () => {
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
              const enviroCount = await contract.methods.enviroCount().call()
              setEnviroCount(enviroCount)
              const socialCount = await contract.methods.socialCount().call()
              setSocialCount(socialCount)
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
              //Load Enviros
              for (var i = 1; i <= enviroCount; i++) {
                  const newEnviro = await contract.methods.enviros(i).call()
                  setEnviros(enviros =>([...enviros, newEnviro]))
              }
              for (var i = 1; i <= enviroCount; i++) {
                  const newEnviro = await contract.methods.enviros(i).call()
                  setEnviroForm(enviros =>([...enviros, JSON.parse(newEnviro.document)]))
              }
              for (var i = 1; i <= enviroCount; i++) {
                const newenviro = await contract.methods.enviros(i).call()
                const parse = JSON.parse(newenviro.document)
                setEnergyE(enviros =>([...enviros, (parse.energy)]))
                setMaterialE(enviros =>([...enviros, (parse.material)]))
            }
              //Load Socials
              for (var i = 1; i <= socialCount; i++) {
                  const newSocial = await contract.methods.socials(i).call()
                  setSocials(socials =>([...socials, newSocial]))
              }
              for (var i = 1; i <= socialCount; i++) {
                  const newSocial = await contract.methods.socials(i).call()
                  setSocialForm(socials =>([...socials, JSON.parse(newSocial.document)]))
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
    const [enviroCount, setEnviroCount] = useState()
    const [enviros, setEnviros] = useState([])
    const [enviroform, setEnviroForm] = useState([])
    const [socialCount, setSocialCount] = useState()
    const [socials, setSocials] = useState([])  
    const [form, setForm] = useState([])
    const [energy, setEnergy] = useState([])
    const [energyE, setEnergyE] = useState([])
    const [material, setMaterial] = useState([])
    const [materialE, setMaterialE] = useState([])
    const [socialform, setSocialForm] = useState([])

    const Emerge = (enviros.map(t1 => ({...t1, ...enviroform.find(t2 => t2.id === t1.id)})))
    const Smerge = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))

    const supp = Emerge.filter(obj => obj.account.includes("0x3421668462324bFB48EA07D0B12243091CD09759")).map(obj => (obj));
    const suppS = Smerge.filter(obj => obj.account.includes("0x3421668462324bFB48EA07D0B12243091CD09759")).map(obj => (obj));
    const lastSupp = supp.slice(-1)
    const lastSuppS = suppS.slice(-1)

    
  return (
    <>
    <Sidebar/>
    <div className='margin'>
    <table className="assess-table">
         <AssessList assessments={lastSupp} energy={energy} material={material}/>
         <SocialList assessments={lastSuppS} />
         {lastSupp.length === 0 && lastSuppS.length === 0 ? <h2> No Assessment Found</h2> : null}
    </table>
    </div>
    </>
  )
}

export default Company