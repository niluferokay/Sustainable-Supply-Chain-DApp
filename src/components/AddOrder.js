import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
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
                //Load account
                const accounts = await web3.eth.getAccounts()
                // console.log(accounts)
                setAccount(accounts[0])
                // console.log(account)
                console.log(Origin.abi)
                const networkId = await web3.eth.net.getId()
                console.log(networkId)
                const networkData = Origin.networks[networkId]
                console.log(networkData)
                if (networkData) {
                    // const abi = 
                    // const address = networkData.address
                    //Fetch contract
                    const contract = new web3.eth.Contract(Origin.abi, networkData.address)
                    setContract(contract)
                    console.log(contract)
                    const productCount = await contract.methods.productCount().call()
                    setProductCount(productCount)
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
    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [productCount, setProductCount] = useState()        
        
    const {register} = useForm();
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
        setQuantity("") 
    }

    return (
        <div className="form-content">
            <form className="order-form" onSubmit={onSubmit}>
            <div className="form-header">
                <h2>Add Order</h2>
                <button className="btn form-close" style= {{background:"red"}} onClick={onAdd}>X</button>
            </div>                
                <div className="form-inputs">
                    <label htmlFor="name"
                    className="form-label">
                    Select a product</label>
                    <select 
                        className="form-input"
                        {...register("name", {required: true })}
                        value = {name} onChange={(e) => setName(e.target.value)}
                    >
                    <option value=""disabled selected hidden></option>
                    {/* <option value="T-shirt">T-shirt</option> */}
                    {products.map(product => { 
                    return <option value={product.name}>{product.name} </option>
                    })}
                    </select>
                </div>
                <div className="form-inputs">
                    <label htmlFor="quantity"
                    className="form-label">
                    Quantity / Unit
                    </label>
                        <input 
                            id="quantity"
                            type="text"
                            name="quantity"
                            className="quantity"
                            placeholder="Enter quantity"
                            {...register("quantity", {required: true })}
                            value = {quantity} onChange={(e) => setQuantity(e.target.value)}
                        />
                        <select 
                            className="unit"
                            {...register("unit", {required: true })}
                            value = {unit} onChange={(e) => setUnit(e.target.value)}                        
                        >
                            <option value=""disabled selected hidden></option>
                            <option value="kg">kg</option>
                            <option value="items">items</option>
                        </select>
                    </div>
                <button className="btn form-input-btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddOrder
