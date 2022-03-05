import React from 'react'
import LCA from '../LCA'
import LCAIndicators from '../LCAIndicators'
import Sidebar from '../Sidebar'

const LCAForm = () => {
  return (
    <div>
      <Sidebar/>
      {/* <LCAIndicators/> */}
      <LCA/>
    </div>
  )
}

export default LCAForm