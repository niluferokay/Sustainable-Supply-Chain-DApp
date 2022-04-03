import React, { useState, useEffect} from 'react'
import Web3 from "web3"
import Origin from "../../abis/Origin.json"
import Assessment from "../../abis/Assessments.json"
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
  
  const [contract, setContract] = useState([])
  const [account, setAccount] = useState([])        
  const [shipmentCount, setShipmentCount] = useState()        
  const [shipments, setShipment] = useState([])

  const { isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyAAtD8arMVlDgNnv9xQQHKhI6OaVgl7rkk"
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
          <h2>Product Journey</h2>
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={11}
              center={center}
              options={options}
              onLoad={onMapLoad}
            >
            {shipments.map((a) => (
              <Marker 
              key={a.id}
              position={{lat: Number(a.latitude), lng: Number(a.longitude)}} />

            ))}
            </GoogleMap>
        </div>
        <Timeline shipments={shipments} />
    </div>
  )
}

export default Journey
