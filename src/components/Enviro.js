import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Web3 from "web3"
import Assessment from "../abis/Assessments.json"
import * as AiIcons from 'react-icons/ai';


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
                const enviroCount = await contract.methods.enviroCount().call()
                setEnviroCount(enviroCount)
                //Load Enviros
                for (var i = 1; i <= enviroCount; i++) {
                    const newEnviro = await contract.methods.enviros(i).call()
                    setEnviros(enviros =>([...enviros, newEnviro]))
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
    const [enviroCount, setEnviroCount] = useState()
    const [enviros, setEnviros] = useState([])
    const [date, setDate] = useState("")
    const [d, setD] = useState("")

    const [monthYear, setMonthYear] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [energy, setEnergy] = useState("")
    const [renewenergy, setRenewenergy] = useState("")
    const [water, setWater] = useState("")
    const [waterrec, setWaterrec] = useState("")
    const [material, setMaterial] = useState("")
    const [materialrec, setMaterialrec] = useState("")
    const [land, setLand] = useState("")
    const [bio, setBio] = useState("")
    const [sensitive, setSensitive] = useState("")
    const [ghg, setGhg] = useState("")
    const [waterpol, setWaterpol] = useState("")
    const [landpol, setLandpol] = useState("")
    const [air, setAir] = useState("")
    const [hazmat, setHazmat] = useState("")
    const [hazwaste, setHazwaste] = useState("")
    const [solidwaste, setSolidwaste] = useState("")
    const [solidwasterec, setSolidwasterec] = useState("")
    const [solidwastedes, setSolidwastedes] = useState("")
    const [waterwaste, setWaterwaste] = useState("")
    const [waterwasterec, setWaterwasterec] = useState("")
    const [waterwastedes, setWaterwastedes] = useState("")
    const [productrec, setProductrec] = useState("")
    const [ecolabel, setEcolabel] = useState("")
    const [product, setProduct] = useState("")
    const [envirostand, setEnvirostand] = useState("")
    const [clean, setClean] = useState("")
    const [envirosus, setEnvirosus] = useState("")
    const [suppliers, setSuppliers] = useState("")
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const monthNumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

    const onSubmit = async(e) =>{
        e.preventDefault()
        const enviroForm = {
            id: (parseInt(enviroCount)+1).toString(),
            energy: energy, 
            renewenergy: renewenergy,
            water: water,
            waterrec: waterrec,
            material: material,
            materialrec: materialrec,
            land: land,
            bio: bio,
            sensitive: sensitive,
            ghg: ghg,
            waterpol: waterpol,
            landpol: landpol,
            air: air,
            hazmat: hazmat,
            hazwaste: hazwaste,
            solidwaste: solidwaste,
            solidwasterec: solidwasterec,
            solidwastedes: solidwastedes,
            waterwaste: waterwaste,
            waterwasterec: waterwasterec,
            waterwastedes: waterwastedes,
            productrec: productrec,
            ecolabel: ecolabel,
            product: product,
            envirostand: envirostand,
            clean: clean,
            envirosus: envirosus,
            suppliers: suppliers
        }
        const document = JSON.stringify(enviroForm)
        setD("now")
        await addEnviro({date, document, month, year})
    }

    console.log(month + year)
    useEffect(() => {
        getDate()
        getMonth()
    }, [d, monthYear])

    const getDate = async () => {
        const tomonth = new Date()
        const d = await tomonth.getDate() +'-'+ (tomonth.getMonth()+1) +'-'+ tomonth.getFullYear()
        const t = await tomonth.getHours() + ":" + tomonth.getMinutes() + ":" + tomonth.getSeconds()
        const date = await d + " " + t
        setDate(date)
        console.log(date)
    }

    const getMonth = () => {
        const month = monthYear.toString().substr(-2)
        const year = monthYear.toString().substr(0,4)
        setYear(year)
        for (var i = 0; i <= 11; i++) {
        if (month === monthNumber[i]) {
            setMonth(months[i])
        }
    }}

    const addEnviro = ({date, document, month, year}) => {
        contract.methods.addEnviro(date, document, month, year).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.assign('http://localhost:3000/assessments')
        })
    }

    const handleChange = (name, checked, set) => {
        checked === true ? set((prev) => [...prev, name]) 
        : console.log("")
    }
    return (
            <div className="lca-container">
            <form className="lca-form" onSubmit={onSubmit}>
                <div>
                    <h3>Enviromental Sustainability Assessment</h3>
                        <div className="center">
                            <div>
                        <label>
                            Select Month/ Year  
                            </label>
                            <input 
                                type='month' required
                                value = {monthYear} onChange={(e) => setMonthYear(e.target.value)}
                            />
                            </div>
                        </div>
                <fieldset className="monthly-kpi-env"><legend>Monthly KPI Update</legend>
                    <div className='center-form-input'>
                        <label 
                            className="form-label">
                            1 - Total amount of energy consumption per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {energy} onChange={(e) => setEnergy(e.target.value)}
                            /> 
                            <label class="wrap_text"> kWh/ month</label> 
                            <div></div>
                            <label 
                            className="form-label">
                            2 - Total amount of renewable energy used in energy consumption per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {renewenergy} onChange={(e) => setRenewenergy(e.target.value)}
                            /><label class="wrap_text"> kWh/ month</label> 
                        <div></div> 
                        <label 
                            className="form-label">
                            3 - Total amount of water used per month 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> <label class="wrap_text"> ㎥/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            4 - Total amount of recycled or reused water used in water consumption per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {waterrec} onChange={(e) => setWaterrec(e.target.value)}
                            /> <label class="wrap_text"> ㎥/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            5 - Total amount of materials other than water used per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {material} onChange={(e) => setMaterial(e.target.value)}
                            /> <label class="wrap_text">kg/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            6 - Total amount of recycled or reused materials used per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {materialrec} onChange={(e) => setMaterialrec(e.target.value)}
                                /> <label class="wrap_text">kg/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            7 - Total amount of greenhouse gas emission (CO2, CH4, N2O, HFCs, PFCs, SF6) per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {ghg} onChange={(e) => setGhg(e.target.value)}
                            /><label class="wrap_text"> tonnes of CO2eq/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            8 -Total amount of water pollution generated per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {waterpol} onChange={(e) => setWaterpol(e.target.value)}
                                /> <label class="wrap_text"> ㎥/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            9 - Total amount of land pollution generated per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {landpol} onChange={(e) => setLandpol(e.target.value)}
                                /> <label class="wrap_text"> m²/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            10 - Total amount of air emission (NOx, SOx) generated per month 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {air} onChange={(e) => setAir(e.target.value)}
                                /> <label class="wrap_text"> tonnes/month</label> 
                        <div></div> 
                        <label 
                            className="form-label">
                            11 - Total amount of hazardous materials used per month
                            <AiIcons.AiOutlineQuestionCircle style={{fontSize: "15px", color:"#2F4050"}} /></label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {hazmat} onChange={(e) => setHazmat(e.target.value)}
                                /> <label class="wrap_text">kg/ month</label> 
                        <div></div> 
                        <label 
                            className="form-label">
                            12 - Total amount of solid waste generated per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {solidwaste} onChange={(e) => setSolidwaste(e.target.value)}
                                /> <label class="wrap_text">kg/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            13 - Total amount of solid waste recycled or reused per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {solidwasterec} onChange={(e) => setSolidwasterec(e.target.value)}
                                /> <label class="wrap_text">kg/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            14 - Choose the type(s) of solid waste destination 
                            </label>
                            <div></div>
                            <input 
                                type="checkbox"
                                name = "Recycling" onChange={(e) => handleChange(e.target.name, e.target.checked, setSolidwastedes)}/> 
                                <label class="wrap_text"> Recycling</label>
                            <input 
                                type="checkbox"
                                name = "Reuse" onChange={(e) => handleChange(e.target.name, e.target.checked, setSolidwastedes)}/> 
                                <label class="wrap_text"> Reuse</label> 
                            <input 
                                type="checkbox"
                                name = "Recovery" onChange={(e) => handleChange(e.target.name, e.target.checked, setSolidwastedes)}/> 
                                <label class="wrap_text"> Recovery</label> 
                            <input 
                                type="checkbox"
                                name = "Incineration" onChange={(e) => handleChange(e.target.name, e.target.checked, setSolidwastedes)}/> 
                                <label class="wrap_text"> Incineration</label> 
                            <input 
                                type="checkbox"
                                name = "Landfilling" onChange={(e) => handleChange(e.target.name, e.target.checked, setSolidwastedes)}/> 
                                <label class="wrap_text"> Landfilling</label> 
                            <input 
                                type="checkbox"
                                name = "Composting" onChange={(e) => handleChange(e.target.name, e.target.checked, setSolidwastedes)}/> 
                                <label class="wrap_text"> Composting</label> 
                        <div></div>                         <div></div> 
                        <label 
                            className="form-label">
                            15 - Total amount of waste water generated per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {waterwaste} onChange={(e) => setWaterwaste(e.target.value)}
                                /> <label class="wrap_text"> ㎥/ month</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            16 - Total amount of waste water recycled or reused per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {waterwasterec} onChange={(e) => setWaterwasterec(e.target.value)}
                                /> <label class="wrap_text"> ㎥/ month</label>
                        <div></div>
                        <label 
                            className="form-label">
                            17 - Choose the type(s) of waste water destination 
                            </label>
                            <div></div>
                            <input 
                                type="checkbox"
                                name = "Recycling" onChange={(e) => handleChange(e.target.name, e.target.checked, setWaterwastedes)}/> 
                                <label class="wrap_text"> Recycling</label>
                            <input 
                                type="checkbox"
                                name = "Reuse" onChange={(e) => handleChange(e.target.name, e.target.checked, setWaterwastedes)}/> 
                                <label class="wrap_text"> Reuse</label> 
                            <input 
                                type="checkbox"
                                name = "Recovery" onChange={(e) => handleChange(e.target.name, e.target.checked, setWaterwastedes)}/> 
                                <label class="wrap_text"> Recovery</label> 
                            <input 
                                type="checkbox"
                                name = "Incineration" onChange={(e) => handleChange(e.target.name, e.target.checked, setWaterwastedes)}/> 
                                <label class="wrap_text"> Incineration</label> 
                            <input 
                                type="checkbox"
                                name = "Landfilling" onChange={(e) => handleChange(e.target.name, e.target.checked, setWaterwastedes)}/> 
                                <label class="wrap_text"> Landfilling</label> 
                            <input 
                                type="checkbox"
                                name = "Composting" onChange={(e) => handleChange(e.target.name, e.target.checked, setWaterwastedes)}/> 
                                <label class="wrap_text"> Composting</label> 
                        <div></div>  
                        <label 
                            className="form-label">
                            18 - Total amount of hazardous waste generated per month
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                                value = {hazwaste} onChange={(e) => setHazwaste(e.target.value)}
                                /> <label class="wrap_text"> ㎥/ month</label>
                        <div></div> 
                    </div>
                </fieldset>
                <fieldset className='annual-kpi'><legend>Annual KPI Update</legend>
                <div>
                        {/* <label 
                            className="form-label">
                            3- Choose the type(s) of renewable energy used
                            </label>
                            <div></div> 
                                <input 
                                    name = "Solar energy" onChange={(e) => handleChange(e.target.name, e.target.checked, setRenewenergytype)}
                                    type="checkbox" /><label class="wrap_text"> Solar energy</label> 
                                <input 
                                    name = "Hydropower" onChange={(e) => handleChange(e.target.name, e.target.checked, setRenewenergytype)}
                                    type="checkbox"/><label class="wrap_text"> Hydropower</label> 
                                <input 
                                    name = "Wind energy" onChange={(e) => handleChange(e.target.name, e.target.checked, setRenewenergytype)}
                                    type="checkbox"/><label class="wrap_text"> Wind energy</label>
                                <input 
                                    name = "Biomass" onChange={(e) => handleChange(e.target.name, e.target.checked, setRenewenergytype)}
                                    type="checkbox"/><label class="wrap_text"> Biomass</label> 
                                <input 
                                    name = "Geothermal energy" onChange={(e) => handleChange(e.target.name, e.target.checked, setRenewenergytype)}
                                    type="checkbox"/><label class="wrap_text"> Geothermal energy</label> 
                        <div></div>  */}
                        <label 
                            className="form-label">
                            1 - Total amount of land owned, leased, or managed for production activities or extractive use
                            </label>
                            <div></div>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()}  
                                value = {land} onChange={(e) => setLand(e.target.value)}
                                /><label class="wrap_text"> m²</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            2 - Is there a biodiversity policy?
                            </label>
                            <div></div>
                            <input 
                                type="radio"
                                value = "Yes" name = "bio" checked={bio === "Yes"} onChange={(e) => setBio(e.target.value)}/>
                                <label class="wrap_text"> Yes</label>
                            <input 
                                type="radio"
                                value = "No" name = "bio" checked={bio === "No"} onChange={(e) => setBio(e.target.value)}/>
                                <label class="wrap_text"> No</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            3 - Are there activities and operations on protected and sensitive areas? (e.g., IUCN protected area categories 1–4, world heritage sites, and biosphere reserves)
                            <AiIcons.AiOutlineQuestionCircle style={{fontSize: "15px", color:"#2F4050"}} /></label>
                            <div></div>
                            <input 
                                type="radio"
                                value = "Yes" name = "sensitive" checked={sensitive === "Yes"} onChange={(e) => setSensitive(e.target.value)}/>
                                <label class="wrap_text"> Yes</label>
                            <input 
                                type="radio"
                                value = "No" name = "sensitive" checked={sensitive === "No"} onChange={(e) => setSensitive(e.target.value)}/>
                                <label class="wrap_text"> No</label>
                        <div></div> 
                        {/* <label 
                            className="form-label">
                            25- Is the product produced recyclable or reusable? 
                            </label>
                            <div></div>
                            <input 
                                type="radio"
                                value = "Yes" checked={productrec === "Yes"} onChange={(e) => setProductrec(e.target.value)}/> 
                                <label class="wrap_text"> Yes</label>
                            <input 
                                type="radio"
                                value = "No" f onChange={(e) => setProductrec(e.target.value)}/>
                                <label class="wrap_text"> No</label>
                        <div></div>  */}
                        <label 
                            className="form-label">
                            4 - Total number of products produced that are recyclable or reusable
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()}  
                                value = {productrec} onChange={(e) => setProductrec(e.target.value)}
                                />
                        <div></div> 
                        <label 
                            className="form-label">
                            5 - Total number of products produced with eco-friendly packaging and labeling
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()}  
                                value = {ecolabel} onChange={(e) => setEcolabel(e.target.value)}
                                />
                        <div></div> 
                        <label 
                            className="form-label">
                            6 - Total number of products produced 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()}  
                                value = {product} onChange={(e) => setProduct(e.target.value)}
                                />
                        <div></div> 
                        <label 
                            className="form-label">
                            7 - Is there  ISO 14000 certification regarding environmental standards?
                            </label>
                            <div></div> 
                            <input 
                                type="radio"
                                value = "Yes" name = "envirostand"  checked={envirostand === "Yes"} onChange={(e) => setEnvirostand(e.target.value)}/> 
                                <label class="wrap_text"> Yes</label>
                            <input 
                                type="radio"
                                value = "No" name = "envirostand" checked={envirostand === "No"} onChange={(e) => setEnvirostand(e.target.value)}/> 
                                <label class="wrap_text"> No</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            8 - Choose the type(s) of clean technology used
                            </label>
                            <div></div> 
                            <input 
                                type="checkbox"
                                name = "Recycling" onChange={(e) => handleChange(e.target.name, e.target.checked, setClean)}/> 
                                <label class="wrap_text"> Recycling</label> 
                            <input 
                                type="checkbox"
                                name = "Renewable energy" onChange={(e) => handleChange(e.target.name, e.target.checked, setClean)}/> 
                                <label class="wrap_text"> Renewable energy</label> 
                            <input 
                                type="checkbox"
                                name = "Green transportation" onChange={(e) => handleChange(e.target.name, e.target.checked, setClean)}/> 
                                <label class="wrap_text"> Green transportation</label>
                            <input 
                                type="checkbox"
                                name = "Electric motors" onChange={(e) => handleChange(e.target.name, e.target.checked, setClean)}/> 
                                <label class="wrap_text"> Electric motors</label>
                            <div></div>   
                            <input 
                                type="checkbox"
                                name = "Green chemistry" onChange={(e) => handleChange(e.target.name, e.target.checked, setClean)}/> 
                                <label class="wrap_text"> Green chemistry</label> 
                            <input 
                                type="checkbox"
                                name = "Green lighting" onChange={(e) => handleChange(e.target.name, e.target.checked, setClean)}/> 
                                <label class="wrap_text"> Green lighting</label>
                            <input 
                                type="checkbox"
                                name = "Grey water" onChange={(e) => handleChange(e.target.name, e.target.checked, setClean)}/> 
                                <label class="wrap_text"> Grey water</label> 
                        <div></div> 
                        <label 
                            className="form-label">
                            9 - Total number of suppliers monitored on environmental sustainability
                            </label>
                            <div></div>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()}  
                                value = {envirosus} onChange={(e) => setEnvirosus(e.target.value)}/>
                        <div></div> 
                        <label 
                            className="form-label">
                            10 - Total number of suppliers
                            </label>
                            <div></div>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()}  
                                value = {suppliers} onChange={(e) => setSuppliers(e.target.value)}/>
                </div>
                </fieldset>
                    <div className='center-btn'>
                        <button className="btn form-input-lca" type="submit">
                        Calculate Assessment
                        </button>
                    </div> 
                </div>
            </form>
            </div>
    )
}

export default Enviro

