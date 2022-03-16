import React from "react"

const ProductList = ({products, onView, onDelete}) => 
products.sort((a,b) => b.id - a.id)
.map(product => (
  <tr key={product.id}>
      {/* <td className="p-img">{product.id.toString()}</td> */}
      <td className="p-img"><img style={{width: "90px", height: "90px", cursor: "pointer"}} 
        src={`https://ipfs.infura.io/ipfs/${product.image}`} alt="" 
        onClick={() => onView(product.image)}/></td>
      <td className="p-name">{product.name}</td>
      <td className="p-comp">{product.company}</td>
      <td></td>
  </tr>


))

const Product = ({ products, onView, onDelete }) => {

    return (
      <>
        <table className="table">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Source</th>
          </tr>
          <ProductList onView={onView} products={products} />
      </table>
    </>

    )
}

export default Product

