import { FaTimes } from "react-icons/fa";
import React from 'react';

//Choose from Products
const OrderList = ({orders, onDelete}) => 
orders.sort((a,b) => b.id - a.id)
.map(order => (
    <tr key={order.id}>
        <td className="p-name">{order.name}</td>
        <td className="p-comp">{order.quantity}</td>
        <td className="p-comp">{order.unit}</td>
        <td className="p-comp">{order.date}</td>
        <td className="delete"><FaTimes 
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => onDelete(order.id)} /></td>
    </tr>
))

const Order = ({ orders, onDelete }) => {

    return (
    <>
    <h3 className="orderTitle">Orders</h3>
        <table className="table">
          <tr>
            <th>Name</th> 
            <th>Quantity</th>
            <th>Unit</th>
            <th>Date / Time</th>
          </tr>
          <OrderList orders={orders} />
      </table>
    </>
    )
}

export default Order
