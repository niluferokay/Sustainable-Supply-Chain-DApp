import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const LCA = () => {
    const {register} = useForm();

    const [energy, setEnergy] = useState("")
    const [batch, setBatch] = useState("")
    const [energyred, setEnergyred] = useState("")
    const [renewenergytype, setRenewenergytype] = useState("")
    const [renewenergy, setRenewenergy] = useState("")
    const [water, setWater] = useState("")
    const [waterrec, setWaterrec] = useState("")
    const [material, setMaterial] = useState("")
    const [materialred, setMaterialred] = useState("")
    const [materialrec, setMaterialrec] = useState("")
    const [ghg, setGhg] = useState("")
    const [waterpol, setWaterpol] = useState("")
    const [soilpol, setSoilpol] = useState("")
    const [air, setAir] = useState("")
    const [hazmat, setHazmat] = useState("")
    const [soilwaste, setSoilwaste] = useState("")
    const [waterwaste, setWaterwaste] = useState("")

    const onSubmit = (e) =>{
        e.preventDefault()
    }

    console.log(water)

    return (
            <div>
            <div className="lca-container">
            <form className="lca-form" onSubmit={onSubmit}>
                <div className="lca-input">
                        <h3>Life Cycle Assessment</h3>
                            <label>
                            1- Total amount of energy used in the supply chain to produce a batch of products 
                            </label>
                            <input 
                                {...register("energy", {required: true})}
                                type='number'
                                value = {energy} onChange={(e) => setEnergy(e.target.value)}
                            /> 
                        <div></div>
                            <label>
                            2- Batch size
                            </label>
                            <input 
                                {...register("batch", {required: true})}
                                type='number'
                                value = {batch} onChange={(e) => setBatch(e.target.value)}
                            /> 
                        <div></div>
                            <label>
                            3- Total amount of energy reduced in the supply chain to produce a batch of products
                            </label>
                            <input 
                                {...register("energyred", {required: true})}
                                type='number'
                                value = {energyred} onChange={(e) => setEnergyred(e.target.value)}
                            /> 
                        <div></div> 
                            <label 
                          >
                            4- Choose the type(s) of renewable energy used in the product production
                            </label>
                            <select 
                                {...register("renewenergytype", {required: true})}
                                type="text"
                                value = {renewenergytype} onChange={(e) => setRenewenergytype(e.target.value)}
                            > 
                            <option value=""disabled selected hidden></option>
                            <option value="Solar">Solar energy</option>
                            <option value="Hydro">Hydro</option>
                            <option value="Wind">Wind</option>
                            <option value="Biomass">Biomass</option>
                            <option value="Geothermal">Geothermal</option>
                            <option value="None">None</option>
                            </select>
                        <div></div> 
                        <label>
                            5- Total amount of renewable energy used in the supply chain to produce a batch of products 
                            </label>
                            <input 
                                {...register("renewenergy", {required: true})}
                                type="text"
                                value = {renewenergy} onChange={(e) => setRenewenergy(e.target.value)}
                            /> 
                        <div></div> 
                        <label>
                            6- Total amount of water used in the supply chain to produce a batch of products
                            </label>
                            <input 
                                {...register("water", {required: true})}
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> 
                        <div></div> 
                        <label>
                            7- Total amount of recycled/reused water used in the supply chain to produce a batch of products
                            </label>
                            <input 
                                {...register("waterrec", {required: true})}
                                type="text"
                                value = {waterrec} onChange={(e) => setWaterrec(e.target.value)}
                            /> 
                        <div></div> 
                        <label>
                            8- Total amount of materials other than water used in the supply chain to produce a batch of products
                            </label>
                            <input 
                                 {...register("material", {required: true})}
                                type="text"
                                value = {material} onChange={(e) => setMaterial(e.target.value)}
                            /> 
                        <div></div> 
                        <label>
                            9- Total amount of reduced materials in the supply chain to produce a batch of products
                            </label>
                            <input 
                                {...register("materialred", {required: true})}
                                type="text"
                                value = {materialred} onChange={(e) => setMaterialred(e.target.value)}/> 
                        <div></div> 
                        <label>
                            10- Total amount of recycled/ reused materials used in the supply chain to produce a batch of products
                            </label>
                            <input 
                                {...register("materialrec", {required: true})}
                                type="text"
                                value = {materialrec} onChange={(e) => setMaterialrec(e.target.value)}/> 
                        <div></div> 
                        {/* <label>
                            11- Choose the type(s) of recycled/ reused materials used in the product production
                            </label>
                            <input 
                                {...register("materialrectype", {required: true})}
                                type="text"
                                value = {materialrectype} onChange={(e) => setMaterialrectype(e.target.value)}/> 
                        <div></div>  */}
                        <label>
                            12- Total amount of of greenhouse gas emission (CO2, CH4, N2O, HFCs, PFCs, SF6) in the supply chain to produce a batch of products
                            </label>
                            <input {...register("ghg", {required: true})}
                                type="text"
                                value = {ghg} onChange={(e) => setGhg(e.target.value)}/>
                        <div></div> 
                        <label>
                            13- Total amount of water pollution generated in the supply chain to produce a batch of products
                            </label>
                            <input  {...register("waterpol", {required: true})}
                                type="text"
                                value = {waterpol} onChange={(e) => setWaterpol(e.target.value)}/> 
                        <div></div> 
                        {/* <label>
                            14- Choose the type(s) of water pollution
                            </label>
                            <input  {...register("waterpoltype", {required: true})}
                                type="text"
                                value = {waterpoltype} onChange={(e) => setWaterpoltype(e.target.value)}/> 
                        <div></div>  */}
                        <label>
                            15- Total amount of soil pollution generated in the supply chain to produce a batch of products
                            </label>
                            <input  {...register("soilpol", {required: true})}
                                type="text"
                                value = {soilpol} onChange={(e) => setSoilpol(e.target.value)}/> 
                        <div></div> 
                        {/* <label>
                            16- Choose the type(s) of soil pollution
                            </label>
                            <input  {...register("soilpoltype", {required: true})}
                                type="text"
                                value = {soilpoltype} onChange={(e) => setSoilpoltype(e.target.value)}
                            /> L/wash
                        <div></div>  */}
                        <label>
                            17- Total amount of air emission (NOx, SOx) in the supply chain to produce a batch of products
                            </label>
                            <input  {...register("air", {required: true})}
                                type="text"
                                value = {air} onChange={(e) => setAir(e.target.value)}/> 
                        <div></div> 
                        <label>
                            18- Total amount of hazardous materials used in the supply chain to produce a batch of products
                            </label>
                            <input
                                {...register("hazmat", {required: true})}
                                type="text"
                                value = {hazmat} onChange={(e) => setHazmat(e.target.value)}/> 
                        <div></div> 
                        <label>
                            19- Total amount of solid waste generated in the supply chain to produce a batch of products
                            </label>
                            <input 
                                {...register("soilwaste", {required: true})}
                                type="text"
                                value = {soilwaste} onChange={(e) => setSoilwaste(e.target.value)}/>
                        <div></div> 
                        <label>
                            20- Total amount of waste water generated in the supply chain to produce a batch of products
                            </label>
                            <input  
                                {...register("waterwaste", {required: true})}
                                type="text"
                                value = {waterwaste} onChange={(e) => setWaterwaste(e.target.value)}/> 
                        <div></div> 
                        {/* <label>
                            21- Choose the type(s) of solid waste generated
                            </label>
                            <input  
                                {...register("soilwastetype", {required: true})}
                                type="text"
                                value = {soilwastetype} onChange={(e) => setSoilwastetype(e.target.value)}/> kg/wash
                        <div></div> 
                        <label>
                            22- Choose the type(s) of solid waste destination
                            </label>
                            <input  
                                {...register("soildwastedes", {required: true})}
                                type="text"
                                value = {soilwastedes} onChange={(e) => setSoilwastedes(e.target.value)}/> kg/wash
                        <div></div> 
                        <label                         
                            className="form-label">
                            23- Choose the type(s) of waste water destination
                            </label>
                            <input 
                                {...register("waterwastedes", {required: true})}
                                type="text"
                                value = {waterwastedes} onChange={(e) => setWaterwastedes(e.target.value)}/> kg/wash
                        <div></div>  */}
                <div></div>
                <button className="btn form-input-btn" type="submit">
                    Calculate LCA
                </button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default LCA