import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Web3 from "web3"
import Sidebar from '../Sidebar'
import Assessment from "../../abis/Assessments.json"
import Origin from "../../abis/Origin.json"

const LCIForm = () => {

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
            const networkDataO = Origin.networks[networkId]
            if (networkData) {
                //Fetch contract
                const contract = new web3.eth.Contract(Assessment.abi, networkData.address)
                setContract(contract)
                const LCICount = await contract.methods.LCICount().call()
                setLCICount(LCICount)
                const contractO = new web3.eth.Contract(Origin.abi, networkDataO.address)
                const productCount = await contractO.methods.productCount().call()
                //Load LCIs
                for (var i = 1; i <= LCICount; i++) {
                    const newLCI = await contract.methods.LCIs(i).call()
                    setLCIs(LCIs =>([...LCIs, newLCI]))
                }
                for (var i = 1; i <= LCICount; i++) {
                    const newLCI = await contract.methods.LCIs(i).call()
                    setForm(LCIs =>([...LCIs, JSON.parse(newLCI.document)]))
                }
                //Load products
                for (var i = 1; i <= productCount; i++) {
                    const newProduct = await contractO.methods.products(i).call()
                    setProducts(products =>([...products, newProduct]))
                }
                }
            else { 
                window.alert("Assessment contract is not deployed to the detected network")
            }
        }
        loadBlockchainData()}, [])

    const {register} = useForm();
    const [contract, setContract] = useState([])
    const [form, setForm] = useState([])
    const [LCIs, setLCIs] = useState([])
    const [account, setAccount] = useState([])        
    const [LCICount, setLCICount] = useState()        
    const [date, setDate] = useState("")
    const [d, setD] = useState("")
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState("")
    const [process, setProcess] = useState("")
    const [monthYear, setMonthYear] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [energy, setEnergy] = useState("")
    const [batch, setBatch] = useState("")
    const [renewenergy, setRenewenergy] = useState("")
    const [water, setWater] = useState("")
    const [waterrec, setWaterrec] = useState("")
    const [material, setMaterial] = useState("")
    const [materialrec, setMaterialrec] = useState("")
    const [ghg, setGhg] = useState("")
    const [waterpol, setWaterpol] = useState("")
    const [waterpoltype, setWaterpoltype] = useState("")
    const [landpol, setLandpol] = useState("")
    const [landpoltype, setLandpoltype] = useState("")
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
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const monthNumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    
    useEffect(() => {
        getDate()
        getMonth()
    }, [d, monthYear])

    const getDate = async () => {
        const today = new Date()
        const d = await today.getDate() +'-'+ (today.getMonth()+1) +'-'+ today.getFullYear()
        const t = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const date = await d + " / " + t
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

    const onSubmit = async(e) =>{
        e.preventDefault()
        const LCIForm = {
            id: (parseInt(LCICount)+1).toString(),
            product: product,
            batch: batch,
            energy: energy, 
            renewenergy: renewenergy,
            water: water,
            waterrec: waterrec,
            material: material,
            materialrec: materialrec,
            ghg: ghg,
            waterpol: waterpol,
            waterpoltype: waterpoltype,
            landpol: landpol,
            landpoltype: landpoltype,
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
            ecolabel: ecolabel
        }
        const document = await JSON.stringify(LCIForm)
        setD("now")
        await addLCI({date, document, month, year, process})

    }

    const addLCI = ({date, document, month, year, process}) => {
        contract.methods.addLCI(date, document, month, year, process).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.assign('http://localhost:3000/assessments')
        })
    }

    const handleChange = (name, checked, set) => {
        checked === true ? set((prev) => [...prev, name]) 
        : console.log("")
    }
    
    return (
      <div>
            <Sidebar/>
            <div className="LCI-container">
              <form className="LCI-form" onSubmit={onSubmit}>
                  <div>
                      <h3>Life Cycle Inventory</h3>
                          <div className="center">
                              <div>
                              <label>
                              Select Month/ Year  
                              </label>
                              <input 
                                  type='month' 
                                  value = {monthYear} onChange={(e) => setMonthYear(e.target.value)}
                              />
                              </div>
                              <div>
                              <label>Select Product</label>
                              <select 
                                  value = {product} onChange={(e) => setProduct(e.target.value)}
                              >
                              <option value=""disabled selected hidden></option>
                              {products.map(product => { 
                              return <option value={product.name}>{product.name} </option>
                              })}
                              </select>
                              </div>
                              <div>
                              <label>Select Production Process</label>
                              <select 
                                  value = {process} onChange={(e) => setProcess(e.target.value)}
                              >
                              <option value=""disabled selected hidden></option>
                              {product !== "" ? products.filter(obj => obj.name.includes(product)).map(product => product.process).map(a => JSON.parse(a).map(process=> 
                              <option value={process}>{process} </option>
                              )) : null}
                              </select>
                          </div>  
                          </div>
                  <fieldset className="monthly-kpi"><legend>Product LCI Update</legend>
                      <div className='center-form-input' >
                          <label>
                          1 - Total number of products in a batch
                          </label> 
                          <input 
                              type='number'  required min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {batch} onChange={(e) => setBatch(e.target.value)}
                          /> 
                      <div></div>
                          <label>
                          2 - Total amount of energy used per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {energy} onChange={(e) => setEnergy(e.target.value)}
                          /><label class="wrap_text"> kWh/ batch</label>
                      <div></div>
                          {/* <label>
                          4- Choose the type(s) of renewable energy used in the product production
                          </label>
                          <div></div> 
                              <input 
                                  name = "Solar energy" onChange={(e) => handleChange(e.target.name, e.target.checked)}
                                  type="checkbox" /><label class="wrap_text"> Solar energy</label> 
                              <input 
                                  name = "Hydropower" onChange={(e) => handleChange(e.target.name, e.target.checked)}
                                  type="checkbox"/><label class="wrap_text"> Hydropower</label> 
                              <input 
                                  name = "Wind energy" onChange={(e) => handleChange(e.target.name, e.target.checked)}
                                  type="checkbox"/><label class="wrap_text"> Wind energy</label>
                              <input 
                                  name = "Biomass" onChange={(e) => handleChange(e.target.name, e.target.checked)}
                                  type="checkbox"/><label class="wrap_text"> Biomass</label> 
                              <input 
                                  name = "Geothermal energy" onChange={(e) => handleChange(e.target.name, e.target.checked)}
                                  type="checkbox"/><label class="wrap_text"> Geothermal energy</label> 
                      <div></div>  */}
                      <label>
                          3 - Total amount of renewable energy used in energy consumption per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {renewenergy} onChange={(e) => setRenewenergy(e.target.value)}
                          /> <label class="wrap_text"> kWh/ batch</label>
                      <div></div> 
                      <label>
                          4 - Total amount of water used per batch 
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {water} onChange={(e) => setWater(e.target.value)}
                          /> <label class="wrap_text"> m3/ batch</label> 
                      <div></div> 
                      <label>
                          5 - Total amount of recycled or reused water used in water consumption per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {waterrec} onChange={(e) => setWaterrec(e.target.value)}
                          /> <label class="wrap_text"> m3/ batch</label> 
                      <div></div> 
                      <label>
                          6 - Total amount of materials other than water used per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {material} onChange={(e) => setMaterial(e.target.value)}
                          /> <label class="wrap_text"> kg/ batch</label> 
                      <div></div> 
                      <label>
                          7 - Total amount of recycled or reused materials used per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {materialrec} onChange={(e) => setMaterialrec(e.target.value)}
                              /> <label class="wrap_text"> kg/ batch</label>  
                      <div></div> 
                      <label>
                          8 - Total amount of greenhouse gas emission (CO2, CH4, N2O, HFCs, PFCs, SF6) generated per batch
                          </label>
                          <input
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {ghg} onChange={(e) => setGhg(e.target.value)}
                              /> <label class="wrap_text"> tonnes of CO2e/ batch</label> 
                      <div></div> 
                      <label>
                          9 - Total amount of water pollution generated per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {waterpol} onChange={(e) => setWaterpol(e.target.value)}
                              /> <label class="wrap_text"> m3/ batch</label> 
                      <div></div>
                      <label 
                          className="form-label">
                          10 - Choose the type(s) of water pollution per batch
                          </label>
                          <input 
                              type="checkbox"
                              name = "Oil" onChange={(e) => handleChange(e.target.name, e.target.checked, setWaterpoltype)}/> 
                              <label class="wrap_text"> Oil</label>
                          <input 
                              type="checkbox"
                              name = "Fuel" onChange={(e) => handleChange(e.target.name, e.target.checked, setWaterpoltype)}/> 
                              <label class="wrap_text"> Fuel</label> 
                          <input 
                              type="checkbox"
                              name = "Wastes" onChange={(e) => handleChange(e.target.name, e.target.checked, setWaterpoltype)}/> 
                              <label class="wrap_text"> Wastes</label> 
                          <input 
                              type="checkbox"
                              name = "Chemical" onChange={(e) => handleChange(e.target.name, e.target.checked, setWaterpoltype)}/> 
                              <label class="wrap_text"> Chemical</label> 
                      <div></div>  
                      <label>
                          11 - Total amount of land pollution generated per batch
                          </label>
                          <input
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {landpol} onChange={(e) => setLandpol(e.target.value)}/>
                              <label class="wrap_text"> m2/ batch</label> 
                      <div></div> 
                      <label 
                          className="form-label">
                          12 - Choose the type(s) of land pollution per batch
                          </label>
                          <input 
                              type="checkbox"
                              name = "Oil" onChange={(e) => handleChange(e.target.name, e.target.checked, setLandpoltype)}/> 
                              <label class="wrap_text"> Oil</label>
                          <input 
                              type="checkbox"
                              name = "Fuel" onChange={(e) => handleChange(e.target.name, e.target.checked, setLandpoltype)}/> 
                              <label class="wrap_text"> Fuel</label> 
                          <input 
                              type="checkbox"
                              name = "Wastes" onChange={(e) => handleChange(e.target.name, e.target.checked, setLandpoltype)}/> 
                              <label class="wrap_text"> Wastes</label> 
                          <input 
                              type="checkbox"
                              name = "Chemical" onChange={(e) => handleChange(e.target.name, e.target.checked, setLandpoltype)}/> 
                              <label class="wrap_text"> Chemical</label> 
                      <div></div> 
                      <label>
                          13 - Total amount of air emission (NOx, SOx) generated per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {air} onChange={(e) => setAir(e.target.value)}
                              /> <label class="wrap_text"> tonnes/ batch</label> 
                      <div></div> 
                      <label>
                          14 - Total amount of hazardous materials used per batch
                          </label>
                          <input
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {hazmat} onChange={(e) => setHazmat(e.target.value)}
                              /> <label class="wrap_text"> kg/ batch</label>  
                      <div></div> 
                      <label 
                          className="form-label">
                          15 - Total amount of hazardous waste generated per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                              value = {hazwaste} onChange={(e) => setHazwaste(e.target.value)}
                              /> <label class="wrap_text"> kg/ batch</label>
                      <div></div>
                      <label>
                          16 - Total amount of solid waste generated per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {solidwaste} onChange={(e) => setSolidwaste(e.target.value)}
                              /> <label class="wrap_text"> kg/ batch</label> 
                      <div></div> 
                      <label 
                          className="form-label">
                          17 - Total amount of solid waste recycled or reused per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                              value = {solidwasterec} onChange={(e) => setSolidwasterec(e.target.value)}
                              /> <label class="wrap_text">kg/ batch</label>
                      <div></div> 
                      <label 
                          className="form-label">
                          18 - Choose the type(s) of solid waste destination 
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
                      <div></div>                          
                      <label 
                          className="form-label">
                          19 - Total amount of wastewater generated per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                              value = {waterwaste} onChange={(e) => setWaterwaste(e.target.value)}
                              /> <label class="wrap_text"> m3/ batch</label>
                      <div></div> 
                      <label 
                          className="form-label">
                          20 - Total amount of wastewater recycled or reused per batch
                          </label>
                          <input 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001"
                              value = {waterwasterec} onChange={(e) => setWaterwasterec(e.target.value)}
                              /> <label class="wrap_text"> m3/ batch</label>
                      <div></div>
                      <label 
                          className="form-label">
                          21 - Choose the type(s) of wastewater destination 
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
                          22 - Is the product recyclable or reusable? 
                          </label>
                          <input 
                              type="radio"
                              value = "Yes" checked={productrec === "Yes"} onChange={(e) => setProductrec(e.target.value)}/> 
                              <label class="wrap_text"> Yes</label>
                          <input 
                              type="radio"
                              value = "No"  checked={productrec === "No"} onChange={(e) => setProductrec(e.target.value)}/>
                              <label class="wrap_text"> No</label>
                         <div></div> 
                            <label 
                          className="form-label">
                          23 - Does the product has eco-friendly packaging and labeling? 
                          </label>
                          <input 
                              type="radio"
                              value = "Yes" checked={ecolabel === "Yes"} onChange={(e) => setEcolabel(e.target.value)}/> 
                              <label class="wrap_text"> Yes</label>
                          <input 
                              type="radio"
                              value = "No"  checked={ecolabel === "No"} onChange={(e) => setEcolabel(e.target.value)}/>
                              <label class="wrap_text"> No</label>
                      <div></div> 
                        </div>       
                  </fieldset>
                      <div className='center-btn'>
                          <button className="btn form-input-LCI" type="submit">
                              Calculate LCI 
                          </button>
                      </div> 
                  </div>
              </form>
            </div>
      </div>
    )
}

export default LCIForm