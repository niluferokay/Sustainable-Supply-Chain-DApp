import React, { useState, useEffect} from 'react'
import Web3 from "web3"
import Origin from "../../abis/Origin.json"
import AddOrder from '../AddOrder'
import Order from '../Order'
import Sidebar from '../Sidebar'
import Shipment from '../Shipment'
import AddShipment from '../AddShipment'
import Button from "../FormButton"

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
                    //Load orders
                    for (var i = 1; i <= orderCount; i++) {
                        const newOrder = await contract.methods.orders(i).call()
                        setOrder(orders =>([...orders, newOrder]))
                    }
                    const shipmentCount = await contract.methods.shipmentCount().call()
                    //Load shipments
                    for (var i = 1; i <= shipmentCount; i++) {
                        const newShipment = await contract.methods.shipments(i).call()
                        setShipment(shipments =>([...shipments, newShipment]))
                        setLatlong(shipments =>([...shipments, JSON.parse(newShipment.latlong)]))
                    }
                    }
                else { 
                    window.alert("Origin contract is not deployed to the detected network")
                }
            }
        loadBlockchainData()}, [])
    
    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [showCreateOrder, setShowCreateOrder] = useState(false)
    const [showCreateShip, setShowCreateShip] = useState(false)
    const [orders, setOrder] = useState([])
    const [shipments, setShipment] = useState([])
    const [shipType, setShipType] = useState("")
    const [latlong, setLatlong] = useState([])
    
    const newShipment = (shipments.map(t1 => ({...t1, ...latlong.find(t2 => t2.id === t1.id)})))

    //Add Order
    const addOrder = ({name, quantity, unit, date}) => {
        contract.methods.addOrder(name, quantity, unit, date).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.reload()
          })
    }

    //Add Shipment
    const addShipment = ({shipType, place, latlong, date, product, process}) => {
        contract.methods.addShipment(shipType, place, latlong, date, product, process).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.reload()
          })
    }

    return (
        <>
        <div className="main-container">
        <Sidebar/>
        <header className="dashheader">
            <div className="shipment-btns">
                <Button 
                onClick={() => {setShowCreateShip(!showCreateShip); setShipType("Shipment Sent")}}
                color="orange"
                text="Send Shipment"
                />
                <Button 
                onClick={() => {setShowCreateShip(!showCreateShip); setShipType("Shipment Received")}}
                color="gold"
                text="Receive Shipment"
                />
            </div>    
                <Button className="btn" 
                onClick= {() => {setShowCreateOrder(!showCreateOrder)}}
                color= {showCreateOrder ? "#f2f2f2" : "#3eb049"}
                text= {showCreateOrder ? "": <>Create Order</>}
                />
        </header>
            {showCreateOrder && <AddOrder addOrder={addOrder}
            onAdd= {() => {setShowCreateOrder(!showCreateOrder)}} />}
            {showCreateShip && <AddShipment addShipment={addShipment}
            shipType={shipType} onShipAdd= {() => {setShowCreateShip(!showCreateShip)}} />}
        <Order orders={orders} />
        <Shipment shipments = {newShipment} orders={orders} />
        </div>
        </>
    )
}

export default Dashboard;


    