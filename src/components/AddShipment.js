import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import Web3 from "web3"
import Origin from "../abis/Origin.json"

const AddShipment = ({addShipment, shipType, onShipAdd}) => {

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
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [place, setAddress] = useState("")
    const [product, setProduct] = useState("")
    const [process, setProcess] = useState("")

    useEffect(() => { 
        getDate()
        getLocation()
    }, [d])

    const getLocation = () => {      
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates,  handleError, {enableHighAccuracy: true})
        }    
    }

    const handleError = () => {
        alert("Geolocation API is not supported in your browser. Please enable Geolocation")
    }
  
    const getCoordinates = async(position) => {
        const accuracy = await position.coords.accuracy
        console.log(accuracy)
        const lat  = await position.coords.latitude.toString()
        console.log("lat", lat)
        const long = await position.coords.longitude.toString()
        console.log("long", long)
        setLatitude(lat)
        setLongitude(long)
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyA1NTVyRpS9yu9w8Otq1K3r-SwMJMvrhNY`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const place = data.results[0].formatted_address
        setAddress(place)
        console.log(place)})        
    }

    const getDate = async () => {
        const today = new Date()
        const d = await today.getDate() +'-'+ (today.getMonth()+1) +'-'+ today.getFullYear()
        const t = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const date = await d + " " + t
        setDate(date)
    }
  
    const onSubmit = async(e) => {
        e.preventDefault()
        setD("now")
        await addShipment({shipType, latitude, longitude, date, account, product, process})
    }
    console.log(shipType)
    
    return (
        <div className='center'>
            <form className="ship-form" onSubmit={onSubmit}>
            <div className="form-header">
                <h2>{shipType==="Shipment Sent" ? "Sent Shipment" : "Receive Shipment"}</h2>
                <button className="btn form-close" style= {{background:"red", fontSize:"14px"}} onClick={onShipAdd}>X</button>
            </div>
            <div className="product-center-form">                
                <div className="form-inputs">
                    <label className='order-label'>Select Product</label>
                    <select 
                        className="order-product"
                        value = {product} onChange={(e) => setProduct(e.target.value)}
                    >
                        <option value=""disabled selected hidden></option>
                        {products.map(product => { 
                        return <option value={product.name}>{product.name} </option>
                        })}
                    </select>
                </div>
                <div className="form-inputs">
                    <label className='order-label'>Select Production Process</label>
                    <select 
                        className="order-product"
                        value = {process} onChange={(e) => setProcess(e.target.value)}
                    >
                        <option value=""disabled selected hidden></option>
                        {product !== "" ? products.filter(obj => obj.name.includes(product)).map(product => product.process).map(a => JSON.parse(a).map(process=> 
                        <option value={process}>{process} </option>
                        )) : null}
                    </select>
                </div>            
                <button className="btn order-input-btn" type="submit">
                    Sent
                </button>
            </div>
            </form>
        </div>
    )
}

export default AddShipment
