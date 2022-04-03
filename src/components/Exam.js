import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
const { create } = require("ipfs-http-client")
const ipfs = create({host:"ipfs.infura.io", port:"5001", protocol: "https"})

// const document = JSON.stringify(enviroForm)
// console.log(json)
// const result = await ipfs.add(json)
// console.log("Ipfs result", result)
// const document = result.path
// console.log(document)


const Exam = () => {
    const {register} = useForm();
    
    // const[form, setForm] = useState([])
    const [energy, setEnergy] = useState("")
    const [batch, setBatch] = useState("")
    const [energyred, setEnergyred] = useState("")

    const onSubmit = async(e) =>{

        // const inputState = {energy, energyred, batch}
        // if (energy&& energyred&& batch) {
        //     setForm((prev => [...prev, inputState]))
        //     setEnergy("")
        //     setEnergyred("")
        //     setBatch("")
    
    }

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
                                {...register("energy")}
                                type='number'
                                value = {energy} onChange={(e) => setEnergy(e.target.value)}
                            /> 
                        <div></div>
                            <label>
                            2- Batch size
                            </label>
                            <input 
                                {...register("batch")}
                                type='number'
                                value = {batch} onChange={(e) => setBatch(e.target.value)}
                            /> 
                        <div></div>
                            <label>
                            3- Total amount of energy reduced in the supply chain to produce a batch of products
                            </label>
                            <input 
                                {...register("energyred")}
                                type='number'
                                value = {energyred} onChange={(e) => setEnergyred(e.target.value)}
                            /> 
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

export default Exam