import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'

const ShipList = ({shipments, onDelete}) => 
shipments.sort((a,b) => b.id - a.id)
.map(shipment => (
    <tr className="shipments" key={shipment.id}>
        <td className="shipType">{shipment.shipType}</td>
        <td className="address"> <IoLocationSharp
        /> {shipment.place}</td>
        <td className="map">
        <iframe 
          style={{width: "120px", height: "100px", cursor: "pointer"}}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA1NTVyRpS9yu9w8Otq1K3r-SwMJMvrhNY&q=${shipment.latitude},${shipment.longitude}&zoom=13`} >
        </iframe>
        </td>
        <td className="date"> {shipment.date} <FaTimes 
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => onDelete(shipment.id)} /></td>
        <td classsName="date" > {shipment.account} </td>
    </tr>
))


const Shipment = ({shipments}) => {

    return (
        <>
        <h3 className="orderTitle">Shipments</h3>
            <table className="table">
              <tr>
                <th className="status">Status</th>                
                <th className="address">Address</th>
                <th className="status">Map View</th>
                <th className="date">Date & Time</th>
                <th className="date">User</th>
              </tr>
              <ShipList shipments={shipments} />
          </table>
        </>)
}

export default Shipment
