import React, { useState, useEffect, useContext } from 'react'
import AddOrder from '../AddOrder'
import Order from '../Order'
import Sidebar from '../Sidebar';
import "../Products.css"
import Web3 from "web3"
import Origin from "../../abis/Origin.json"
import Header from '../Header';
import { ProductContext } from '../../contexts/ProductContext';
import Shipment from '../Shipment';

const Dashboard = () => {

    useEffect(() => { 
        const loadWeb3 = async () => {
          //Load ethereum or web3 object on the browser
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
                // console.log(Origin.abi)
                const networkId = await web3.eth.net.getId()
                // console.log(networkId)
                const networkData = Origin.networks[networkId]
                // console.log(networkData)
                if (networkData) {
                    //Fetch contract
                    const contract = new web3.eth.Contract(Origin.abi, networkData.address)
                    setContract(contract)
                    // console.log(contract)
                    const orderCount = await contract.methods.orderCount().call()
                    setOrderCount(orderCount)
                    // console.log(orderCount, "orders")
                    //Load orders
                    for (var i = 1; i <= orderCount; i++) {
                        const newOrder = await contract.methods.orders(i).call()
                        setOrder(orders =>([...orders, newOrder]))
                    }
                    const shipmentCount = await contract.methods.shipmentCount().call()
                    setShipmentCount(shipmentCount)
                    // console.log(sentShipCount)
                    //Load shipments
                    for (var i = 1; i <= shipmentCount; i++) {
                        const newShipment = await contract.methods.shipments(i).call()
                        setShipment(shipments =>([...shipments, newShipment]))
                    }
                    }
                else { 
                    window.alert("Origin contract is not deployed to the detected network")
                }
            }
            loadBlockchainData()}, [])
    
    const {products} = useContext(ProductContext)
    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [ordersCount, setOrderCount] = useState()        
    const [shipmentCount, setShipmentCount] = useState()        
    const [showCreateOrder, setShowCreateOrder] = useState(false)
    const [showShipment, setShowShipment] = useState(true)
    const [orders, setOrder] = useState([])
    const [shipments, setShipment] = useState([])
    const [sort, setSort] = useState([])
    
    //Add Order
    const addOrder = ({name, quantity, unit, date}) => {
        contract.methods.addOrder(name, quantity, unit, date).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.reload()
          })
    }

    //Add Shipment
    const addShipment = ({shipType, place, latitude, longitude, date}) => {
        contract.methods.addShipment(shipType, place, latitude, longitude, date).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.reload()
          })
    }

    return (
        <>
        <div className="form-container">
        <Sidebar />
        <Header 
            formTitle ="Create Order" 
            onAdd= {() => {setShowCreateOrder(!showCreateOrder)}} 
            showAdd={showCreateOrder} 
            addShipment={addShipment} account = {account}
            />
            {showCreateOrder && <AddOrder products = {products} addOrder={addOrder}
            onAdd= {() => {setShowCreateOrder(!showCreateOrder)}} />}
        <Shipment shipments = {shipments} />
        <Order orders={orders} />
        </div>
        </>
    )
}

export default Dashboard;


    