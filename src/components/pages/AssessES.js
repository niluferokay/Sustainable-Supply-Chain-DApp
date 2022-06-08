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
import { useLocation } from 'react-router-dom';

const AssessList = ({assessments, energy, material}) =>
assessments.map(a => (
    <tr key={a.id}>
        <table className='LCI-table'>
        <caption>Enviromental Sustainability Assessment for 
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
                    <th rowspan='16' className='category'>Natural Resources</th>
                    <th rowspan='1'>Energy consumption <GiIcons.GiElectric/></th>
                    <th>Amount of energy used per month</th>
                    <td>{a.energy}</td>
                    <td>kWh/ month</td>
                </tr>
                <tr>
                    <th rowspan="2">Energy efficiency <MdIcons.MdPowerOff/></th>
                    <th>Amount of energy reduced per month</th>
                    <td>{a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? (energy[a.id-2] - energy[a.id-1]) : null}</td>
                    <td>kWh/ month</td>
                </tr>
                <tr>
                    <th>Percentage of energy reduced per month</th>
                    <td>{(a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null) % 1 !== 0 ? 
                    (a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null).toFixed(1): 
                    (a.id > 1 && energy[a.id-2] > 0 && energy[a.id-1] > 0 ? ((energy[a.id-2] - energy[a.id-1])*100/energy[a.id-2]) : null)}</td>
                    <td>%</td>
                </tr> 
                <tr>
                    <th rowspan='2'>Renewable energy <GiIcons.GiWindTurbine/></th>
                    <th>Amount of renewable energy used per month</th>
                    <td>{a.renewenergy}</td>
                    <td>kWh/ month</td>
                </tr> 
                <tr>
                    <th>Percentage of renewable energy used per month</th>
                    <td>{(a.renewenergy*100/a.energy) % 1 !== 0 ? (a.renewenergy*100/a.energy).toFixed(1): (a.renewenergy*100/a.energy)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Water consumption <GiIcons.GiWaterDrop/></th>
                    <th>Amount of water used per month</th>
                    <td>{a.water}</td>
                    <td>m3/ month</td>
                </tr>
                <tr>
                    <th rowspan='2'>Recycled or reused water <GiIcons.GiWaterRecycling/></th>
                    <th>Amount of recycled or reused water used per month</th>
                    <td>{a.waterrec}</td>
                    <td>m3/ month</td>
                </tr>
                <tr>
                    <th>Percentage of recycled or reused water per month</th>
                    <td>{(a.waterrec*100/a.water) % 1 !== 0 ? (a.waterrec*100/a.water).toFixed(1): (a.waterrec*100/a.water)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Material consumption <AiIcons.AiFillGold/><AiIcons.AiFillGold/></th>
                    <th>Amount of materials other than water used per month</th>
                    <td>{a.material}</td>
                    <td>kg/ month</td>
                </tr>
                <tr>
                    <th rowspan='2'>Material efficiency <AiIcons.AiFillGold/></th>
                    <th>Amount of materials reduced per month</th>
                    <td>{a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? (material[a.id-2] - material[a.id-1]) : null}</td>
                    <td>kg/ month</td>
                </tr>
                <tr>
                    <th>Percentage of materials reduced per month </th>
                    <td>{(a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null) % 1 !== 0 ? 
                    (a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null).toFixed(1): 
                    (a.id > 1 && material[a.id-2] > 0 && material[a.id-1] > 0 ? ((material[a.id-2] - material[a.id-1])*100/material[a.id-2]) : null)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='2'>Recycled or reused materials <BiIcons.BiRecycle/></th>
                    <th>Amount of recycled or reused materials per month </th>
                    <td>{a.materialrec}</td>
                    <td>kg/ month</td>
                </tr>
                <tr>
                    <th>Percentage of recycled or reused materials per month </th>
                    <td>{(a.materialrec*100/a.material) % 1 !== 0 ? 
                    (a.materialrec*100/a.material).toFixed(1): (a.materialrec*100/a.material)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Land use<GiIcons.GiFactory/></th>
                    <th>Amount of land owned, leased, or managed for production activities or extractive use</th>
                    <td>{a.land}</td>
                    <td>m2</td>
                </tr>
                <tr>
                    <th rowspan='2'>Biodiversity<GiIcons.GiCircleForest/></th>
                    <th>Existence of biodiversity policy</th>
                    <td>{a.bio}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Existence of activities and operations on protected and sensitive areas (e.g., IUCN protected area categories 1–4, world heritage sites, and biosphere reserves)</th>
                    <td>{a.sensitive}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='16' className='category'>Pollution and Waste Management</th>
                    <th rowspan='1'>Greenhouse gas emission <GiIcons.GiGreenhouse/></th>
                    <th>Amount of greenhouse gas emission generated per month</th>
                    <td>{a.ghg}</td>
                    <td>tonnes of CO2e</td>
                </tr>
                <tr>
                    <th rowspan='1'>Air Pollution<GiIcons.GiChemicalDrop/></th>
                    <th>Amount of air emission generated per month</th>
                    <td>{a.air}</td>
                    <td>tonnes</td>
                </tr>
                <tr>
                    <th rowspan='2'>Water Pollution<GiIcons.GiChemicalDrop/></th>
                    <th>Amount of water pollution generated per month</th>
                    <td>{a.waterpol}</td>
                    <td>m3/ month</td>
                </tr>
                <tr>
                    <th>Type of water pollution </th>
                    <td>{(a.waterpoltype + " ").replace(/,/g, ', ')}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='2'>Land Pollution<GiIcons.GiChemicalDrop/></th>
                    <th>Amount of land pollution generated per month</th>
                    <td>{a.landpol}</td>
                    <td>m2</td>
                </tr>
                <tr>
                    <th>Type of land pollution </th>
                    <td>{(a.landpoltype + " ").replace(/,/g, ', ')}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='1'>Use and release of hazardous materials<GiIcons.GiNuclearWaste/></th>
                    <th>Amount of hazardous materials used per month </th>
                    <td>{a.hazmat}</td>
                    <td>kg/ month</td>
                </tr>
                <tr>
                    <th rowspan='1'>Hazardous waste<GiIcons.GiNuclearWaste/></th>
                    <th>Amount of hazardous waste generated per month </th>
                    <td>{a.hazwaste}</td>
                    <td>kg/ month</td>
                </tr>
                <tr>
                    <th rowspan='4'>Solid waste<GiIcons.GiTrashCan/></th>
                    <th>Amount of solid waste generated per month </th>
                    <td>{a.solidwaste}</td>
                    <td>kg/ month</td>
                </tr>
                <tr>
                    <th>Amount of solid waste recycled or reused per month </th>
                    <td>{a.solidwasterec}</td>
                    <td>kg/ month</td>
                </tr>
                <tr>
                    <th>Percentage of solid waste recycled or reused per month </th>
                    <td>{(a.solidwasterec*100/a.solidwaste) % 1 !== 0 ? 
                    (a.solidwasterec*100/a.solidwaste).toFixed(1): (a.solidwasterec*100/a.solidwaste)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th>Type of solid waste destination </th>
                    <td>{(a.solidwastedes + " ").replace(/,/g, ', ')}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='4'>Waste water<GiIcons.GiTrashCan/></th>
                    <th>Amount of waste water generated per month </th>
                    <td>{a.waterwaste}</td>
                    <td>m3/ month</td>
                </tr>
                <tr>
                    <th>Amount of waste water recycled or reused per month </th>
                    <td>{a.waterwasterec}</td>
                    <td>m3/ month</td>
                </tr>
                <tr>
                    <th>Percentage of waste water recycled or reused per month </th>
                    <td>{(a.waterwasterec*100/a.waterwaste) % 1 !== 0 ? 
                    (a.waterwasterec*100/a.waterwaste).toFixed(1): (a.waterwasterec*100/a.waterwaste)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th>Type of waste water destination </th>
                    <td>{(a.waterwastedes + " ").replace(/,/g, ', ')}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='5' className='category'>Operations Management and Performance Measurement</th>
                    <th rowspan='1'>Environmental management system<GrIcons.GrCertificate/></th>
                    <th>Existence of external certifications regarding environmental standards</th>
                    <td>{a.envirostand}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='1'>Product recyclability<RiIcons.RiRecycleFill/></th>
                    <th>Percentage of recyclable or reusable products produced per month</th>
                    <td>{(a.productrec*100/a.products) % 1 !== 0 ? 
                    (a.productrec*100/a.products).toFixed(1): (a.productrec*100/a.products)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Green packaging and labeling<BiIcons.BiPackage/></th>
                    <th>Percentage of eco-friendly packaged and labeled products per month</th>
                    <td>{(a.ecolabel*100/a.products) % 1 !== 0 ? 
                    (a.ecolabel*100/a.products).toFixed(1): (a.ecolabel*100/a.products)}</td>
                    <td>%</td>
                </tr>
                <tr>
                    <th rowspan='1'>Cleaner technology<FaIcons.FaSeedling/></th>
                    <th>Type of clean technology used</th>
                    <td>{(a.clean + " ").replace(/,/g, ', ')}</td>
                    <td></td>
                </tr>
                <tr>
                    <th rowspan='1'>Supplier sustainability assessment<MdIcons.MdOutlineAssessment/></th>
                    <th>Percentage of suppliers monitored on environmental sustainability per year</th>
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

const AssessES = () => {
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
              const enviroCount = await contract.methods.enviroCount().call()
              const socialCount = await contract.methods.socialCount().call()
              //Load Enviros
              for (var i = 1; i <= enviroCount; i++) {
                  const newEnviro = await contract.methods.enviros(i).call()
                  setEnviros(enviros =>([...enviros, newEnviro]))
                  const parse = JSON.parse(newEnviro.document)
                  setEnergy(enviros =>([...enviros, (parse.energy)]))
                  setMaterial(enviros =>([...enviros, (parse.material)]))
                  setEnviroForm(enviros =>([...enviros, parse]))
              }
              //Load Socials
              for (var i = 1; i <= socialCount; i++) {
                  const newSocial = await contract.methods.socials(i).call()
                  setSocials(socials =>([...socials, newSocial]))
                  setSocialForm(socials =>([...socials, JSON.parse(newSocial.document)]))
              }
              }
          else { 
              window.alert("Assessment contract is not deployed to the detected network")
          }
      }
      loadBlockchainData()}, [])

    const [accountData, setAccountData] = useState()        
    const [enviros, setEnviros] = useState([])
    const [enviroform, setEnviroForm] = useState([])
    const [socials, setSocials] = useState([])  
    const [energy, setEnergy] = useState([])
    const [material, setMaterial] = useState([])
    const [socialform, setSocialForm] = useState([])

    const location = useLocation();
    const accountD = location.state;

    useEffect(() => {
        setAccountData(accountD)
        console.log(accountD)
    }, [accountD])

    const Emerge = (enviros.map(t1 => ({...t1, ...enviroform.find(t2 => t2.id === t1.id)})))
    const Smerge = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))

    const supp = Emerge.filter(obj => obj.account.includes(accountData)).map(obj => (obj));
    const suppS = Smerge.filter(obj => obj.account.includes(accountData)).map(obj => (obj));
    const lastSupp = supp.slice(-1)
    const lastSuppS = suppS.slice(-1)

    console.log(lastSuppS)
    
  return (
    <>
    <Sidebar/>
    <div className='margin'>
    <table className="assess-table">
         <AssessList assessments={lastSupp} energy={energy} material={material} account={accountData} />
         <SocialList assessments={lastSuppS} Data={accountData} />
         {lastSuppS.length === 0 ? <h3 style={{marginTop: "30px"}}> No Social Assessment Found</h3> : null}
         {lastSupp.length === 0 ? <h3> No Environmental Assessment Found</h3> : null}
    </table>
    </div>
    </>
  )
}

export default AssessES