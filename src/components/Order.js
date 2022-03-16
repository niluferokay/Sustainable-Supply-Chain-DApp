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
        <td className="p-comp">
        {order.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier":
        order.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company":
        order.account === "0xf5D0a9A8cCC008Bc72c6e708F5A7871d094B7E11" ? "Customer": order.account}
          </td>
        <td></td>
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
            <th>User Account</th>
          </tr>
          <OrderList orders={orders} />
      </table>
    </>
    )
}

export default Order
