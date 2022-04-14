import React, { useState } from  'react'
import { IoLocationSharp } from 'react-icons/io5'

const ShipList = ({shipments, getPlace, place}) => 
shipments.sort((a,b) => b.id - a.id)
.map(shipment => (
    <tr className="shipments" key={shipment.id}>
        <td className="shipType">{shipment.shipType}</td>
        <td className="shipType">{shipment.product}</td>
        <td className="shipType">{shipment.process}</td>
        <td className="address"> <IoLocationSharp
        /> 
        {/* {getPlace(shipment.latitude, shipment.longitude)}{place} */}
        </td>
        <td className="map">
        <iframe 
          style={{width: "120px", height: "100px", cursor: "pointer"}}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA1NTVyRpS9yu9w8Otq1K3r-SwMJMvrhNY&q=${shipment.latitude},${shipment.longitude}&zoom=13`} >
        </iframe>
        </td>
        <td className="date"> {shipment.date}</td>
        <td className="p-comp">
        {shipment.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier#1":
        shipment.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Supplier#2":
        shipment.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? "Supplier#3":
        shipment.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? "Supplier#4": shipment.account}
      </td>
    </tr>
))

const Shipment = ({shipments}) => {

  const [place, setPlace] = useState("")

  const getPlace = (lat, long) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyA1NTVyRpS9yu9w8Otq1K3r-SwMJMvrhNY`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const place = data.results[0].formatted_address
        setPlace(place)
  })}

    return (
        <>
        <h3 className="table-title">Shipments</h3>
            <table className="table">
              <tr>
                <th className="status">Shipment Status</th>
                <th className="ship-product">Shipped Product</th>                
                <th className="ship-process">Production Process</th>                                
                <th className="address">Shipment Location</th>
                <th className="mapview">Map View</th>
                <th className="date">Date Time Added</th>
                <th className="status">Added by</th>
              </tr>
              <ShipList shipments={shipments} getPlace={getPlace} place={place} />
          </table>
        </>)
}

export default Shipment
