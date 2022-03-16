import React from 'react'
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
        <td className="date"> {shipment.date}</td>
        <td classsName="date" > 
        {shipment.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier":
        shipment.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company":
        shipment.account === "0xf5D0a9A8cCC008Bc72c6e708F5A7871d094B7E11" ? "Customer": shipment.account}
        </td>
        <td></td>
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
                <th className="status">User Account</th>
              </tr>
              <ShipList shipments={shipments} />
          </table>
        </>)
}

export default Shipment
