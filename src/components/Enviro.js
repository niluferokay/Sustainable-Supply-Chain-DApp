import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Web3 from "web3"
import Assessment from "../abis/Assessments.json"
const { create } = require("ipfs-http-client")
const ipfs = create({host:"ipfs.infura.io", port:"5001", protocol: "https"})

const Enviro = () => {

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
                const assessmentCount = await contract.methods.assessmentCount().call()
                setAssessmentCount(assessmentCount)
                //Load assessments
                for (var i = 1; i <= assessmentCount; i++) {
                    const newAssessment = await contract.methods.assessments(i).call()
                    setAssessments(assessments =>([...assessments, newAssessment]))
                }
                }
            else { 
                window.alert("Assessment contract is not deployed to the detected network")
            }
        }
        loadBlockchainData()}, [])

    const {register} = useForm();
    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [assessmentCount, setAssessmentCount] = useState()        
    const [assessments, setAssessments] = useState([])
    const [date, setDate] = useState("")
    const [document, setDocument] = useState([])
    const [assessType, setAssessType] = useState("")
    const [d, setD] = useState("")

    const [energy, setEnergy] = useState("")
    const [energyred, setEnergyred] = useState("")
    const [renewenergytype, setRenewenergytype] = useState("")
    const [renewenergy, setRenewenergy] = useState("")
    const [water, setWater] = useState("")
    const [waterrec, setWaterrec] = useState("")
    const [material, setMaterial] = useState("")
    const [materialred, setMaterialred] = useState("")
    const [materialrec, setMaterialrec] = useState("")
    const [land, setLand] = useState("")
    const [bio, setBio] = useState("")
    const [sensitive, setSensitive] = useState("")
    const [ghg, setGhg] = useState("")
    const [waterpol, setWaterpol] = useState("")
    const [soilpol, setSoilpol] = useState("")
    const [air, setAir] = useState("")
    const [hazmat, setHazmat] = useState("")
    const [solidwaste, setSoilwaste] = useState("")
    const [waterwaste, setWaterwaste] = useState("")
    const [productrec, setProductrec] = useState("")
    const [envirostand, setEnvirostand] = useState("")
    const [reverse, setReverse] = useState("")
    const [reversetype, setReversetype] = useState("")
    const [clean, setClean] = useState("")
    const [envirosus, setEnvirosus] = useState("")
    const [suppliers, setSuppliers] = useState("")

    const onSubmit = async(e) =>{
        e.preventDefault()
        const enviroForm = {
            id: assessmentCount,
            energy: energy, 
            energyred: energyred,
            renewenergytype: renewenergytype,
            renewenergy: renewenergy,
            water: water,
            waterrec: waterrec,
            material: material,
            materialred: materialred,
            materialrec: materialrec,
            land: land,
            bio: bio,
            sensitive: sensitive,
            ghg: ghg,
            waterpol: waterpol,
            soilpol: soilpol,
            air: air,
            hazmat: hazmat,
            solidwaste: solidwaste,
            waterwaste: waterwaste,
            productrec: productrec,
            envirostand: envirostand,
            reverse: reverse,
            reversetype: reversetype,
            envirosus: envirosus,
            suppliers: suppliers
        }
        const document = JSON.stringify(enviroForm)
        // console.log(json)
        // const result = await ipfs.add(json)
        // console.log("Ipfs result", result)
        // const document = result.path
        // console.log(document)
        const assessType = "Environmental Sustainability Assessment"
        setAssessType(assessType)
        setD("now")
        await addAssessment({assessType, document})
    }

    useEffect(() => {
        getDate()
    }, [d])

    const getDate = async () => {
        const today = new Date()
        const d = await today.getDate() +'-'+ (today.getMonth()+1) +'-'+ today.getFullYear()
        const t = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const date = await d + " " + t
        setDate(date)
        console.log(date)
    }

    const addAssessment = ({assessType, document}) => {
        contract.methods.addAssessment(assessType, document).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.reload()
        })
    }

    return (
            <div>
            <div className="lca-container">
            <form className="lca-form" onSubmit={onSubmit}>
                <div className="lca-input">
                        <h3>Enviromental Sustainability Assessment</h3>
                            <label 
                            className="form-label">
                            1- Total amount of energy used per day (kWh/ day)   
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {energy} onChange={(e) => setEnergy(e.target.value)}
                            /> 
                        <div></div>
                            <label 
                            className="form-label">
                            2- Total amount of energy reduced per day (kWh/ day) 
                            </label>
                            <input 
                                type='number' min='0'
                                value = {energyred} onChange={(e) => setEnergyred(e.target.value)}
                            /> 
                        <div></div>
                            <label 
                            className="form-label">
                            3- Choose the type(s) of renewable energy used
                            </label>
                            <input 
                                    value = {renewenergytype} onChange={(e) => setRenewenergytype(e.target.value)}
                                    type="checkbox"/>Solar energy
                                <input 
                                    value = {renewenergytype} onChange={(e) => setRenewenergytype(e.target.value)}
                                    type="checkbox"/>Hydro
                                <input 
                                    value = {renewenergytype} onChange={(e) => setRenewenergytype(e.target.value)}
                                    type="checkbox"/>Wind
                                <input 
                                    value = {renewenergytype} onChange={(e) => setRenewenergytype(e.target.value)}
                                    type="checkbox"/>Biomass
                                <input 
                                    value = {renewenergytype} onChange={(e) => setRenewenergytype(e.target.value)}
                                    type="checkbox"/>Geothermal
                        <div></div> 
                            <label 
                            className="form-label">
                            4- Total amount of renewable energy used per day (kWh/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {renewenergy} onChange={(e) => setRenewenergy(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            5- Total amount of water used per day (m3/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            6- Total amount of recycled/reused water used per day (m3/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {waterrec} onChange={(e) => setWaterrec(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            7- Total amount of materials other than water used per day (kg/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {material} onChange={(e) => setMaterial(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            8- Total amount of reduced materials per day (kg/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {materialred} onChange={(e) => setMaterialred(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            9- Total amount of recycled/reused materials used per day (kg/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {materialrec} onChange={(e) => setMaterialrec(e.target.value)}/> 
                        <div></div> 
                        {/* <label 
                            className="form-label">
                            10- Choose the type(s) of recycled/ reused materials used
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> MJ/kg textile
                        <div></div>  */}
                        <label 
                            className="form-label">
                            11- Total amount of land owned, leased, or managed for production activities or extractive use (ha)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {land} onChange={(e) => setLand(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            12- Is there a biodiversity policy?
                            </label>
                            <input 
                                type="radio"
                                value = {bio} onChange={(e) => setBio(e.target.value)}/> Yes
                            <input 
                                type="radio"
                                value = {bio} onChange={(e) => setBio(e.target.value)}/> No
                        <div></div> 
                        <label 
                            className="form-label">
                            13- Are there activities and operations on protected and sensitive areas? (e.g., IUCN protected area categories 1–4, world heritage sites, and biosphere reserves)
                            </label>
                            <input 
                                type="radio"
                                value = {sensitive} onChange={(e) => setSensitive(e.target.value)}/> Yes
                            <input 
                                type="radio"
                                value = {sensitive} onChange={(e) => setSensitive(e.target.value)}/> No
                        <div></div> 
                        <label 
                            className="form-label">
                            14- Total amount of of greenhouse gas emission (CO2, CH4, N2O, HFCs, PFCs, SF6) per day (t of CO2e/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {ghg} onChange={(e) => setGhg(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            15- Total amount of water pollution generated per day (m3/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {waterpol} onChange={(e) => setWaterpol(e.target.value)}/> 
                        <div></div> 
                        {/* <label 
                            className="form-label">
                            16- Choose the type(s) of water pollution
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> 
                        <div></div>  */}
                        <label 
                            className="form-label">
                            17- Total amount of soil pollution generated per day
                            </label>
                            <input 
                                type='number' min='0'
                                value = {soilpol} onChange={(e) => setSoilpol(e.target.value)}/> 
                        <div></div> 
                        {/* <label 
                            className="form-label">
                            18- Choose the type(s) of soil pollution
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> 
                        <div></div>  */}
                        <label 
                            className="form-label">
                            19- Total amount of air emission (NOx, SOx) generated per day (t/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {air} onChange={(e) => setAir(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            20- Total amount of hazardous materials used per day (kg/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {hazmat} onChange={(e) => setHazmat(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            21- Total amount of solid waste generated per day (kg/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {solidwaste} onChange={(e) => setSoilwaste(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            22- Total amount of waste water generated per day (m3/ day)
                            </label>
                            <input 
                                type='number' min='0'
                                value = {waterwaste} onChange={(e) => setWaterwaste(e.target.value)}/> 
                        <div></div> 
                        {/* <label 
                            className="form-label">
                            23- Choose the type(s) of solid waste generated
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> 
                        <div></div>  */}
                        {/* <label 
                            className="form-label">
                            24- Choose the type(s) of solid waste destination
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> 
                        <div></div>  */}
                        {/* <label 
                            className="form-label">
                            25- Choose the type(s) of waste water destination
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> 
                        <div></div>  */}
                        <label 
                            className="form-label">
                            25- Is the product produced recyclable/reusable? 
                            </label>
                            <input 
                                type="radio"
                                value = {productrec} onChange={(e) => setProductrec(e.target.value)}/> Yes
                            <input 
                                type="radio"
                                value = {productrec} onChange={(e) => setProductrec(e.target.value)}/> No
                        <div></div> 
                        <label 
                            className="form-label">
                            26- Choose the external certification(s) regarding environmental standards
                            </label>
                            <input 
                                type="checkbox"
                                value = {envirostand} onChange={(e) => setEnvirostand(e.target.value)}/> ISO14000
                        <div></div> 
                        <label 
                            className="form-label">
                            27- Is there reverse logistics system?
                            </label>
                            <input 
                                type="radio"
                                value = {reverse} onChange={(e) => setReverse(e.target.value)}/> Yes
                            <input 
                                type="radio"
                                value = {reverse} onChange={(e) => setReverse(e.target.value)}/> No
                        <div></div> 
                        <label 
                            className="form-label">
                            28- Choose the type(s) of reverse logistics
                            </label>
                            <input 
                                type="checkbox"
                                value = {reversetype} onChange={(e) => setReversetype(e.target.value)}/> Returns
                            <input 
                                type="checkbox"
                                value = {reversetype} onChange={(e) => setReversetype(e.target.value)}/> Reselling
                            <input 
                                type="checkbox"
                                value = {reversetype} onChange={(e) => setReversetype(e.target.value)}/> Repairs
                            <input 
                                type="checkbox"
                                value = {reversetype} onChange={(e) => setReversetype(e.target.value)}/> Repackaging
                            <input 
                                type="checkbox"
                                value = {reversetype} onChange={(e) => setReversetype(e.target.value)}/> Recycling
                        <div></div> 
                        <label 
                            className="form-label">
                            29- Choose the type(s) of clean technology used?
                            </label>
                            <input 
                                type="checkbox"
                                value = {clean} onChange={(e) => setClean(e.target.value)}/> Recycling
                            <input 
                                type="checkbox"
                                value = {clean} onChange={(e) => setClean(e.target.value)}/> Renewable energy
                            <input 
                                type="checkbox"
                                value = {clean} onChange={(e) => setClean(e.target.value)}/> Green transportation
                            <input 
                                type="checkbox"
                                value = {clean} onChange={(e) => setClean(e.target.value)}/> Electric motors
                            <input 
                                type="checkbox"
                                value = {clean} onChange={(e) => setClean(e.target.value)}/> Green chemistry
                            <input 
                                type="checkbox"
                                value = {clean} onChange={(e) => setClean(e.target.value)}/> Green lighting
                            <input 
                                type="checkbox"
                                value = {clean} onChange={(e) => setClean(e.target.value)}/> Grey water
                        <div></div> 
                        <label 
                            className="form-label">
                            30- Total number of suppliers monitored on environmental sustainability
                            </label>
                            <input 
                                type='number' min='0'
                                value = {envirosus} onChange={(e) => setEnvirosus(e.target.value)}/>
                        <div></div> 
                        <label 
                            className="form-label">
                            31- Total number of suppliers
                            </label>
                            <input 
                                type='number' min='0'
                                value = {suppliers} onChange={(e) => setSuppliers(e.target.value)}/>
                        <div></div> 
                <button className="btn form-input-btn lca" type="submit">
                    Calculate LCA
                </button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Enviro

