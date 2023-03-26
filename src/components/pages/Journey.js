import React, { useState, useEffect} from 'react'
import Web3 from "web3"
import Origin from "../../abis/Origin.json"
import Sidebar from '../Sidebar'
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api"
import Timeline from '../Timeline'

const Journey = () => {

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
            const networkId = await web3.eth.net.getId()
            const networkData = Origin.networks[networkId]
            if (networkData) {
                //Fetch contract
                const contract = new web3.eth.Contract(Origin.abi, networkData.address)
                const orderCount = await contract.methods.orderCount().call()
                //Load orders
                for (var i = 1; i <= orderCount; i++) {
                    const newOrder = await contract.methods.orders(i).call()
                    setOrders(orders =>([...orders, newOrder]))
                }
                const shipmentCount = await contract.methods.shipmentCount().call()
                //Load shipments
                for (var i = 1; i <= shipmentCount; i++) {
                    const newShipment = await contract.methods.shipments(i).call()
                    setShipment(shipments =>([...shipments, newShipment]))
                    setOrderID(shipments =>([...shipments, newShipment.product]))
                    setLatlong(shipments =>([...shipments, JSON.parse(newShipment.latlong)]))
                }
                }
            else { 
                window.alert("Origin contract is not deployed to the detected network")
            }
        }
    loadBlockchainData()}, [])
  
  const [shipments, setShipment] = useState([])
  const [orderID, setOrderID] = useState([])
  const [orders, setOrders] = useState([])
  const [formProduct, setFormProduct] = useState("")
  const [latlong, setLatlong] = useState([])
    
  const newShipment = (shipments.map(t1 => ({...t1, ...latlong.find(t2 => t2.id === t1.id)})))

  const unique = [...new Set(orderID.map(item => item))]

  const { isLoaded} = useLoadScript({
    googleMapsApiKey: "YOUR-API-KEY-HERE"
  });

  const mapContainerStyle = {
    width: "600px", height: "300px",   borderRadius: "20px"
  };
  
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  const center = {
    lat:41.1122, lng:29.0200
  };

  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (!isLoaded) return null;

  return (
    <div>
        <Sidebar/>
        <div className="journey-map">
        <div className='timeline-header'>
                <label>Select a Product to View the Journey</label>
                <div></div>
                  <select 
                    value ={formProduct} onChange={(e) => setFormProduct(e.target.value)}
                  >
                  <option value=""disabled selected hidden></option>
                  {unique.map(a => {  
                  return <option value={a}>
                    ORDER # {a}: {orders.filter(obj=> obj.id.includes(a)).map(o=> o.name)}  </option>
                  })}
                  </select>
        </div>
        {formProduct !== "" ? 
        <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={11}
              center={center}
              options={options}
              onLoad={onMapLoad}
            >      
            {newShipment.filter(obj => obj.product.includes(formProduct)).map((a) => (
              <Marker 
              key={a.id}
              position={{lat: Number(a.latitude), lng: Number(a.longitude)}} />

            ))}
            </GoogleMap> : null}
        </div>
        <Timeline shipments={shipments} product={formProduct}/>
    </div>
  )
}

export default Journey
