import React from 'react'
import AddOrder from './AddOrder'
import Order from './Order'
import "./App.css";
import { useState, useEffect} from "react"
import Web3 from "web3"
import Origin from "./abis/Origin.json"

const Dashboard = () => {

    useEffect(() => { 
        const loadWeb3 = async () => {
          //Load ethereum or web3 object on to the browser
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
                    // const abi = 
                    // const address = networkData.address
                    //Fetch contract
                    const contract = new web3.eth.Contract(Origin.abi, networkData.address)
                    setContract(contract)
                    console.log(contract)
                    const orderCount = await contract.methods.orderCount().call()
                    setOrderCount(orderCount)
                    console.log(orderCount)
                    //Load orders
                    for (var i = 1; i <= orderCount; i++) {
                        const newOrder = await contract.methods.orders(i).call()
                        setOrder(orders =>([...orders, newOrder]))
                    }
                    }
                else { 
                    window.alert("Origin contract is not deployed to the detected network")
                }
            }
            loadBlockchainData()}, [])
    
    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [ordersCount, setOrderCount] = useState()        
    const [showCreateOrder, setShowCreateOrder] = useState(false)
    const [orders, setOrder] = useState([])

    //Add Order
    const addOrder = ({name, quantity, unit, date}) => {
        contract.methods.addOrder(name, quantity, unit, date).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.reload()
          })
    }
    
    return (
        <>
        <div className="form-container">
        <AddOrder addOrder={addOrder}
        onAdd= {() => {setShowCreateOrder(!showCreateOrder)}} />
        <Order orders={orders} />
        </div>
        </>
    )
}

export default Dashboard

