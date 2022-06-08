import React, { useState, useEffect} from 'react'
import Assessment from "../../abis/Assessments.json"
import Web3 from "web3"
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as GrIcons from 'react-icons/gr';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io';
import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom';

const SocialList = ({assessments}) =>
assessments.map(a => (
    <tr key={a.id}>
        <table className='LCI-table'>
      <caption>Social Sustainability Assessment for 
      {a.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? " Supplier#1":
        a.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? " Supplier#2":
        a.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? " Supplier#3":
        a.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? " Supplier#4":
        a.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? " Company": a.account}
      </caption>
      <caption className='captwo'>{"For period " + a.month + " " + a.year}</caption>
      <thead>
          <th>Categories</th>
          <th>Indicators</th>
          <th>Measurements</th>
          <th>Values</th>
          <th>Units</th>
      </thead>
      <tbody>
    <tr>
    <th rowspan='17' className='category'>Labor Practices</th>
    <th rowspan='2'>Employee training and development <MdIcons.MdOutlineSchool/></th>
      <th>Average training hours per employee per year</th>
      <td>{(a.trainh/a.trainemp) % 1 !== 0 ? (a.trainh/a.trainemp).toFixed(1): (a.trainh/a.trainemp)}</td>
      <td>hours/ year</td>
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
      <td>turnover/ year</td>
    </tr>
    <tr>
    <th rowspan='2'>Full and part-time employees<GrIcons.GrUserWorker/></th>
      <th>Percentage of full-time employees</th>
      <td>{(a.fullemp*100/a.emp) % 1 !== 0 ? (a.fullemp*100/a.emp).toFixed(1): (a.fullemp*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Percentage part-time employees</th>
      <td>{((a.emp-a.fullemp)*100/a.emp) % 1 !== 0 ? ((a.emp-a.fullemp)*100/a.emp).toFixed(1): ((a.emp-a.fullemp)*100/a.emp)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='2'>Hours of work<AiIcons.AiOutlineClockCircle/></th>
      <th>Average weekly contractual working hours per employee per month</th>
      <td>{a.workh}</td>
      <td>hours/ month</td>
    </tr>
    <tr>
      <th>Average weekly overtime hours per employee per month</th>
      <td>{a.overtimeh}</td>
      <td>hours/ month</td>
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
      <td>female wage/ male wage</td>
    </tr>
    <tr>
      <th>Employee gender diversity</th>
      <td>{(a.fem/a.male) % 1 !== 0 ? (a.fem/a.male).toFixed(1): (a.fem/a.male)}</td>
      <td>female employees/ male employees</td>
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
      <td>{(a.socialstand + " ").replace(/,/g, ', ')}</td>
      <td></td>
    </tr>
    <tr>
    <th rowspan='6' className='category'>Work Health and Safety</th>
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
      <td>accidents/ year</td>
    </tr>
    <tr>
    <th rowspan='7' className='category'>Human Rights</th>
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
      <th>Discrimination incidents per year</th>
      <td>{a.discri}</td>
      <td>incidents</td>
    </tr>
    <tr>
    <th rowspan='2'>Child and forced labor<GiIcons.GiCrossedChains/></th>
      <th>Child labor </th>
      <td>{a.child}</td>
      <td>employees</td>
    </tr>
    <tr>
      <th>Forced labor</th>
      <td>{a.forced}</td>
      <td>employees</td>
    </tr>
    <tr>
    <th rowspan='1'>Rights of indigenous people<FaIcons.FaFeatherAlt/></th>
      <th>Violation of the rights of indigenous people per year</th>
      <td>{a.indig}</td>
      <td>incidents/ year</td>
    </tr>
    <tr>
    <th rowspan='6' className='category'>Society</th>
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
      <th>Corruption incidents per year</th>
      <td>{a.corrup}</td>
      <td>incidents/ year</td>
    </tr>
    <tr>
    <th rowspan='1'>Anti-competitive behavior<GiIcons.GiPodiumWinner/></th>
      <th>Legal actions pending or completed regarding anti-competitive behavior per year</th>
      <td>{a.anticomp}</td>
      <td>legal actions/ year</td> 
    </tr>
    <tr>
    <th rowspan='1'>Supplier sustainability assessment<MdIcons.MdOutlineAssessment/></th>
      <th>Percentage of suppliers monitored on social sustainability per year</th>
      <td>{(a.socialsus*100/a.suppliers) % 1 !== 0 ? (a.socialsus*100/a.suppliers).toFixed(1): (a.socialsus*100/a.suppliers)}</td>
      <td>%</td>
    </tr>
    <tr>
    <th rowspan='5' className='category'>Customer Responsibility</th>
    <th rowspan='2'>Customer health and safety<MdIcons.MdHealthAndSafety/></th>
      <th>Percentage of products and services for which health and safety impacts are assessed</th>
      <td>{(a.productassess*100/a.product) % 1 !== 0 ? (a.productassess*100/a.product).toFixed(1): (a.productassess*100/a.product)}</td>
      <td>%</td>
    </tr>
    <tr>
      <th>Health and safety incidents concerning products and services per year</th>
      <td>{a.productincident}</td>
      <td>incidents/ year</td>
    </tr>
    <tr>
    <th rowspan='2'>Respect for privacy<MdIcons.MdOutlinePrivacyTip/></th>
      <th>Customer privacy complaints per year</th>
      <td>{a.privacy}</td>
      <td>complaints/ year</td>
    </tr>
    <tr>
      <th>Leaks, thefts, or losses of customer data per year</th>
      <td>{a.leaks}</td>
      <td>leaks, thefts, or losses/ year</td>
    </tr>
    <tr>
    <th rowspan='1'>Customer satisfaction<AiIcons.AiOutlineLike/></th>
      <th>Customer complaints per month</th>
      <td>{a.cuscomp}</td>
      <td>complaints/ month</td>
    </tr>
      </tbody>
        </table>
        </tr>
))

const SocialAssess = () => {
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
              const socialCount = await contract.methods.socialCount().call()
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

    const [socials, setSocials] = useState([])  
    const [socialform, setSocialForm] = useState([])
    const [date, setDate] = useState()        

    const location = useLocation();
    const dateState = location.state;

    useEffect(() => {
        setDate(dateState)
        console.log(dateState)
    }, [dateState])

    const Smerge = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))
    const social = Smerge.filter(obj => obj.date.includes(date)).map(obj => (obj));
    
  return (
    <>
    <Sidebar/>
    <div className='margin'>
    <table className="assess-table">
         <SocialList assessments={social} />
         {social === "" ? <h2> No Assessment Found</h2> : null}
    </table>
    </div>
    </>
  )
}

export default SocialAssess

{/* {showForm[a.id] ? 
    <div className='LCI-indicators'>
        <AiIcons.AiOutlineClose className='LCI-x'
        onClick={() => handleClick(a.id)}/>
        <table className='LCI-table'>
        <caption>Social Assessment of {a.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier#1":
        a.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Supplier#2":
        a.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? "Supplier#3":
        a.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? "Supplier#4":
        a.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company": a.account}
        </caption>
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
        </div>: ""} */}