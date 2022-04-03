import React from "react"

const ProductList = ({products, onView}) => 
products.sort((a,b) => b.id - a.id)
.map(product => (
  <tr key={product.id}>
      {/* <td className="p-img">{product.id.toString()}</td> */}
      <td className="p-img"><img style={{width: "90px", height: "90px", cursor: "pointer"}} 
        src={`https://ipfs.infura.io/ipfs/${product.image}`} alt="" 
        onClick={() => onView(product.image)}/></td>
      <td className="p-name">{product.name}</td>
      <td className="p-comp">{product.company}</td>
      <td className="p-comp">{product.date}</td>
      <td className="p-comp">
        {product.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier#1":
        product.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Supplier#2":
        product.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company":
        product.account === "0xf5D0a9A8cCC008Bc72c6e708F5A7871d094B7E11" ? "Customer": product.account}
      </td>     
  </tr>


))

const Product = ({ products, onView }) => {

    return (
      <>
        <table className="table">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Source</th>
            <th>Date / Time</th>
            <th>Added by User</th>
          </tr>
          <ProductList onView={onView} products={products} />
      </table>
    </>

    )
}

export default Product

