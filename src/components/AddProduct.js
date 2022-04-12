import React, { useState, useEffect } from 'react'
import * as AiIcons from 'react-icons/ai';
const { create } = require("ipfs-http-client")
const ipfs = create({host:"ipfs.infura.io", port:"5001", protocol: "https"})

const AddProduct = ({ addProduct, onAdd}) => {
    
    const [name, setName] = useState("")
    const [processes, setProcesses] = useState([""])
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

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log("submitting...")
        const result = await ipfs.add(buffer)
        console.log("Ipfs result", result)
        const image = result.path
        const process = await JSON.stringify(processes)
        console.log(process)
        setD("now")
        addProduct({name, image, process, date})
    }

    const handleAddField = () => {
        setProcesses([...processes, ""])
    }

    const handleChangeInput = (id, event) => {
        const values = [...processes];
        values[id] = event.target.value;
        setProcesses(values);
      }

    const handleRemoveField = (id) => {
        const values  = [...processes];
        values.splice(id, 1);
        setProcesses(values);   
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
                    <label>Image</label>
                    <input 
                        type="file"
                        className="product"
                        placeholder="Upload an Image"
                        onChange={captureFile}
                        />
                </div>
                <div></div>                
                <div className="form-inputs">
                    <label>Product Name</label>
                    <input 
                        type="text"
                        className="product"
                        placeholder="Enter Product Name"
                        value = {name} onChange={(e) => setName(e.target.value)}
                        />
                </div>
                <h3>Product Production Processes</h3>
                {processes.map((c, id) => {
                    return(
                <div className="form-inputs" key={id}>
                    <input
                        name='process'
                        className="process-add"
                        placeholder="Enter Product Production Process"
                        value= {c} onChange={(e) => handleChangeInput(id, e)}
                        /><AiIcons.AiOutlinePlusCircle className="add" onClick= {handleAddField}/>
                        {process.length !== 1 ? <AiIcons.AiOutlineMinusCircle className="add" onClick= {() => handleRemoveField(id)}/> : null}

                </div>
                )})}
                <div></div>
                <button className="btn form-input-btn" type="submit">
                    Add
                </button>
            </div>
            </form>
        </div>
    )
}

export default AddProduct

    