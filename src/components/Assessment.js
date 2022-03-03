import React from 'react'

const Assessment = () => {
  return (
    <>
    <h3 className="orderTitle">Assessments</h3>
        <table className="table">
          <tr>
            <th>Assessment Type</th> 
            <th>Assessment (Document Icon here linked to assessment)</th>
            <th>Date / Time</th>
            <th>Added By User</th>
          </tr>
          {/* <OrderList orders={orders} /> */}
      </table>
    </>

  )
}

export default Assessment