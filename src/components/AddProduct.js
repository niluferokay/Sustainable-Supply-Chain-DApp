import React, { useState, useEffect } from 'react'
const { create } = require("ipfs-http-client")
const ipfs = create({host:"ipfs.infura.io", port:"5001", protocol: "https"})

const AddProduct = ({ addProduct, onAdd}) => {
    
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [buffer, setBuffer] = useState("")
    const [date, setDate] = useState("")
    const [d, setD] = useState("")

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

    const onSubmit= async (e) => {
        e.preventDefault()
        console.log("submitting...")
        const result = await ipfs.add(buffer)
        console.log("Ipfs result", result)
        const image = result.path
        console.log(image)
        setD("now")
        addProduct({name, image, company, date})

        setName("")
        setCompany("") 
    }

    return (
        <div className="center">
            <form className="product-form" onSubmit={onSubmit}>
            <div className="product-form-header">
                <h2>Add Product</h2>
                <button className="btn form-close" style= {{background:"red", fontSize:"14px"}} onClick={onAdd}>X</button>
            </div>
            <div className="product-center-form">                
                <div className="form-inputs">
                    <label>Product Name</label>
                    <input 
                        type="text"
                        className="product"
                        placeholder="Enter product name"
                        value = {name} onChange={(e) => setName(e.target.value)}
                        />
                </div>
                <div className="form-inputs">
                    <label>Image</label>
                    <input 
                        type="file"
                        className="product"
                        placeholder="Enter image"
                        onChange={captureFile}
                        />
                </div>
                <div className="form-inputs">
                    <label>Company Name</label>
                    <input 
                        type="companyName"
                        className="product"
                        placeholder="Select company name"
                        value= {company} onChange={(e) => setCompany(e.target.value)}
                        />
                </div>
                <button className="btn form-input-btn" type="submit">
                    Add
                </button>
            </div>
            </form>
        </div>
    )
}

export default AddProduct

    