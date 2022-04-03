import React from 'react';

const OrderList = ({orders}) => 
orders.sort((a,b) => b.id - a.id)
.map(order => (
    <tr key={order.id}>
        <td className="id">{order.id}</td>
        <td className="p-name">{order.name}</td>
        <td className="p-comp">{order.quantity}</td>
        <td className="p-comp">{order.unit}</td>
        <td className="p-comp">{order.date}</td>
        <td className="p-comp">
        {order.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier#1":
        order.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Supplier#2":
        order.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company":
        order.account === "0xf5D0a9A8cCC008Bc72c6e708F5A7871d094B7E11" ? "Customer": order.account}
      </td>  
        <td></td>
    </tr>
))

const Order = ({ orders}) => {

    return (
    <>
    <h3 className="table-title">Orders</h3>
        <table className="table">
          <tr>
            <th>#</th>
            <th>Name</th> 
            <th>Quantity</th>
            <th>Unit</th>
            <th>Date / Time</th>
            <th>Added by user</th>
          </tr>
          <OrderList orders={orders} />
      </table>
    </>
    )
}

export default Order
