import React, { useEffect, useState } from 'react';
import Web3 from "web3"
import Origin from "../abis/Origin.json"

const AddOrder = ({addOrder, onAdd}) => {

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
            console.log(networkId)
            const networkData = Origin.networks[networkId]
            console.log(networkData)
            if (networkData) {
                //Fetch contract
                const contract = new web3.eth.Contract(Origin.abi, networkData.address)
                const productCount = await contract.methods.productCount().call()
                console.log(productCount)
                //Load products
                for (var i = 1; i <= productCount; i++) {
                    const newProduct = await contract.methods.products(i).call()
                    setProducts(products =>([...products, newProduct]))
                }
                }
            else { 
                window.alert("Origin contract is not deployed to the detected network")
            }
        }
        loadBlockchainData()}, [])

    const [products, setProducts] = useState([])        
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [unit, setUnit] = useState("")
    const [date, setDate] = useState("")
    const [d, setD] = useState("")
    
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
    
    const onSubmit = async(e) => {
        e.preventDefault()
        console.log(name)
        console.log(quantity)
        console.log(unit)
        setD("now")
        addOrder({name, quantity, unit, date})
    }

    return (
        <div className='center'>
            <form className="order-form" onSubmit={onSubmit}>
            <div className="form-header">
                <h2>Add Order</h2>
                <button className="btn form-close" style= {{background:"red", fontSize:"14px"}} onClick={onAdd}>X</button>
            </div>
            <div className="product-center-form">                
                <div className="form-inputs">
                    <label className='order-label'>Select Product</label>
                    <select 
                        className="order-product" required
                        value = {name} onChange={(e) => setName(e.target.value)}
                    >
                        <option value=""disabled selected hidden></option>
                        {products.map(product => { 
                        return <option value={product.name}>{product.name} </option>
                        })}
                    </select>
                </div>
                <div className="form-inputs">
                    <label className='order-label'>Product Quantity and Unit</label>
                        <input 
                            type="number"
                            className="quantity" required
                            placeholder="Enter Product Quantity"
                            value = {quantity} onChange={(e) => setQuantity(e.target.value)}
                        />
                        <select 
                            className="unit" required
                            value = {unit} onChange={(e) => setUnit(e.target.value)}                        
                        >
                            <option value=""disabled selected hidden>Select Unit</option>
                            <option value="kg">kg</option>
                            <option value="items">items</option>
                        </select>
                </div>
                <button className="btn order-input-btn" type="submit">
                    Add
                </button>
            </div>
            </form>
        </div>
    )
}

export default AddOrder
