import React from 'react'
import { useState} from "react"
const { create } = require("ipfs-http-client")
const ipfs = create({host:"ipfs.infura.io", port:"5001", protocol: "https"})

const AddProduct = ({ addProduct, showAdd }) => {
    
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [buffer, setBuffer] = useState("")

    const captureFile = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
    
        reader.onloadend = async (e) => {
            await convertToBuffer(reader)
        }    
    }

    const convertToBuffer = async(reader) => {
        //file is converted to a buffer to upload to IPFS
          const buffer = Buffer.from(reader.result)
        //set this buffer -using es6 syntax
          setBuffer(buffer)
          console.log(buffer)
        }

    const onSubmit= async (e) => {
        e.preventDefault()
        console.log("submitting...")
        const result = await ipfs.add(buffer)
        console.log("Ipfs result", result)
        const image = result.path
        console.log(image)

        addProduct({name, image, company})

        setName("")
        setCompany("") 
    }

    return (

        <div className="form-content">
            <form className="form" onSubmit={onSubmit}>
                <div className="form-inputs">
                    <label htmlFor="productName"
                    className="form-label">
                    Product Name
                    </label>
                    <input 
                        id="productName"
                        type="text"
                        name="productName"
                        className="form-input"
                        placeholder="Enter product name"
                        // {...register("productName", {required: true })}
                        value = {name} onChange={(e) => setName(e.target.value)}
                        />
                </div>
                <div className="form-inputs">
                    <label htmlFor="image"
                    className="form-label">
                    Image
                    </label>
                    <input 
                        id="image"
                        type="file"
                        name="image"
                        className="form-input"
                        placeholder="Enter image"
                        // {...register("image", {required: false })}
                        onChange={captureFile}
                        />
                </div>
                <div className="form-inputs">
                    <label htmlFor="companyName"
                    className="form-label">
                    Company Name
                    </label>
                    <input 
                        id="companyName"
                        type="companyName"
                        name="companyName"
                        className="form-input"
                        placeholder="Select company name"
                        // {...register("companyName", {required: true })}
                        value= {company} onChange={(e) => setCompany(e.target.value)}
                        />
                </div>
                <button className="btn form-input-btn" type="submit">
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddProduct

    