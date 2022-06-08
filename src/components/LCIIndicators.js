import React from 'react'
import { FcDocument } from "react-icons/fc";
import { Link } from 'react-router-dom';

const AssessList = ({assessments}) =>
assessments.sort((a,b) => b.id - a.id)
.map(a => (
    <tr key={a.id}>
    <td className="p-name">
      <Link to="lci" state={a.date} style={{ textDecoration: 'none', color: "black"}}>
      <FcDocument style={{ fontSize: "30px", cursor: "pointer" }}/> 
      </Link>
      </td>
    <td className="p-comp">{a.product}</td>
    <td className="p-comp">{a.process}</td>
    <td className="p-comp">{a.month + " " + a.year}</td>
    <td className="p-comp">
        {a.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier#1":
        a.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Supplier#2":
        a.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company":
        a.account === "0xf5D0a9A8cCC008Bc72c6e708F5A7871d094B7E11" ? "Customer": a.account}
    </td>  
    <td className="p-comp">{a.date}</td>
    </tr>
))

const LCIIndicators = ({assessments}) => {

  return (
    <>
    <h3 className="table-title">Life Cycle Inventories</h3>
        <table className="assess-table">
          <tr>
            <th  className='LCI-assess'>Assessment</th>
            <th className='LCI-product'>Product</th>
            <th>Process</th>
            <th className='LCI-period'>Period (Month  Year)</th>
            <th>User</th>
            <th>Date  Time Added</th>
          </tr>
          <AssessList assessments={assessments}/>
      </table>
    </>
  )
}

export default LCIIndicators