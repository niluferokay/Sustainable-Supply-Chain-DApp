import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Web3 from "web3"
import Sidebar from '../Sidebar'
import Assessment from "../../abis/Assessments.json"
import Origin from "../../abis/Origin.json"

const LCAForm = () => {

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
                const LCACount = await contract.methods.LCACount().call()
                setLCACount(LCACount)
                const contractO = new web3.eth.Contract(Origin.abi, networkDataO.address)
                const productCount = await contractO.methods.productCount().call()
                //Load LCAs
                for (var i = 1; i <= LCACount; i++) {
                    const newLCA = await contract.methods.LCAs(i).call()
                    setLCAs(LCAs =>([...LCAs, newLCA]))
                }
                for (var i = 1; i <= LCACount; i++) {
                    const newLCA = await contract.methods.LCAs(i).call()
                    setForm(LCAs =>([...LCAs, JSON.parse(newLCA.document)]))
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
    const [LCAs, setLCAs] = useState([])
    const [account, setAccount] = useState([])        
    const [LCACount, setLCACount] = useState()        
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
    const [soilpol, setSoilpol] = useState("")
    const [air, setAir] = useState("")
    const [hazmat, setHazmat] = useState("")
    const [soilwaste, setSoilwaste] = useState("")
    const [waterwaste, setWaterwaste] = useState("")
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
        const lcaForm = {
            id: (parseInt(LCACount)+1).toString(),
            product: product,
            energy: energy, 
            batch: batch,
            renewenergy: renewenergy,
            water: water,
            waterrec: waterrec,
            material: material,
            materialrec: materialrec,
            ghg: ghg,
            waterpol: waterpol,
            soilpol: soilpol,
            air: air,
            hazmat: hazmat,
            soilwaste: soilwaste,
            waterwaste: waterwaste
        }
        const document = await JSON.stringify(lcaForm)
        setD("now")
        await addLCA({date, document, month, year, process})

    }

    const addLCA = ({date, document, month, year, process}) => {
        contract.methods.addLCA(date, document, month, year, process).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.assign('http://localhost:3000/assessments')
        })
    }
    
    return (
      <div>
            <Sidebar/>
            <div className="lca-container">
              <form className="lca-form" onSubmit={onSubmit}>
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
                          1- Total amount of energy used  
                          </label> 
                          <input 
                              {...register("energy")} 
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {energy} onChange={(e) => setEnergy(e.target.value)}
                          /><label class="wrap_text"> kWh</label>
                      <div></div>
                          <label>
                          2- Batch amount
                          </label>
                          <input 
                              {...register("batch")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {batch} onChange={(e) => setBatch(e.target.value)}
                          /> 
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
                          5- Total amount of renewable energy used  
                          </label>
                          <input 
                              {...register("renewenergy")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {renewenergy} onChange={(e) => setRenewenergy(e.target.value)}
                          /> <label class="wrap_text"> kWh</label>
                      <div></div> 
                      <label>
                          6- Total amount of water used 
                          </label>
                          <input 
                              {...register("water")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {water} onChange={(e) => setWater(e.target.value)}
                          /> <label class="wrap_text"> ㎥</label> 
                      <div></div> 
                      <label>
                          7- Total amount of recycled or reused water used 
                          </label>
                          <input 
                              {...register("waterrec")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {waterrec} onChange={(e) => setWaterrec(e.target.value)}
                          /> <label class="wrap_text"> ㎥</label> 
                      <div></div> 
                      <label>
                          8- Total amount of materials other than water used 
                          </label>
                          <input 
                                  {...register("material")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {material} onChange={(e) => setMaterial(e.target.value)}
                          /> <label class="wrap_text"> kg</label> 
                      <div></div> 
                      <label>
                          10- Total amount of recycled or reused materials used 
                          </label>
                          <input 
                              {...register("materialrec")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {materialrec} onChange={(e) => setMaterialrec(e.target.value)}
                              /> <label class="wrap_text"> kg</label>  
                      <div></div> 
                      <label>
                          12- Total amount of of greenhouse gas emission (CO2, CH4, N2O, HFCs, PFCs, SF6) 
                          </label>
                          <input {...register("ghg")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {ghg} onChange={(e) => setGhg(e.target.value)}
                              /> <label class="wrap_text"> t CO2eq</label> 
                      <div></div> 
                      <label>
                          13- Total amount of water pollution generated 
                          </label>
                          <input  {...register("waterpol")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {waterpol} onChange={(e) => setWaterpol(e.target.value)}
                              /> <label class="wrap_text"> ㎥</label> 
                      <div></div> 
                      <label>
                          15- Total amount of soil pollution generated 
                          </label>
                          <input  {...register("soilpol")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {soilpol} onChange={(e) => setSoilpol(e.target.value)}/> 
                      <div></div> 
                      <label>
                          17- Total amount of air emission (NOx, SOx) 
                          </label>
                          <input  {...register("air")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {air} onChange={(e) => setAir(e.target.value)}
                              /> <label class="wrap_text"> ppm</label> 
                      <div></div> 
                      <label>
                          18- Total amount of hazardous materials used 
                          </label>
                          <input
                              {...register("hazmat")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {hazmat} onChange={(e) => setHazmat(e.target.value)}
                              /> <label class="wrap_text"> kg</label>  
                      <div></div> 
                      <label>
                          19- Total amount of solid waste generated 
                          </label>
                          <input 
                              {...register("soilwaste")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {soilwaste} onChange={(e) => setSoilwaste(e.target.value)}
                              /> <label class="wrap_text"> kg</label> 
                      <div></div> 
                      <label>
                          20- Total amount of waste water generated 
                          </label>
                          <input  
                              {...register("waterwaste")}
                              type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                              value = {waterwaste} onChange={(e) => setWaterwaste(e.target.value)}
                              /> <label class="wrap_text"> ㎥</label>  
                      </div>
                  </fieldset>
                      <div className='center-btn'>
                          <button className="btn form-input-lca" type="submit">
                              Calculate LCI 
                          </button>
                      </div> 
                  </div>
              </form>
            </div>
      </div>
    )
}

export default LCAForm