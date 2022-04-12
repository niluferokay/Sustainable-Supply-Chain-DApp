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
      <td className="p-comp">{(product.process).replace(/^\[(.+)\]$/,'$1').replace(/"/g, ' ')}</td>
      <td className="p-comp">{product.date}</td>
  </tr>

))

const Product = ({ products, onView }) => {

    return (
      <>
        <table className="table">
          <tr>
            <th className='product-img'></th>
            <th className='product-name'>Product Name</th>
            <th className='process'>Product Production Processes</th>
            <th>Date Time Added</th>
          </tr>
          <ProductList onView={onView} products={products} />
      </table>
    </>

    )
}

export default Product

