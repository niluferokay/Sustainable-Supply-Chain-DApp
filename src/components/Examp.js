import React from 'react'
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';

const List = ({form}) =>
form.sort((a,b) => b.count - a.count)
.map(f => (
    <tbody>
    <tr key={f.count}>
        <th rowspan='1'>Energy consumption <GiIcons.GiElectric/></th>
        <th>Amount of energy consumption per unit of product</th>
        <td>{f.energy/f.batch}</td>
        <td>kWh/ unit of product</td>
    </tr>
    <tr>
        <th rowspan="2">Energy efficiency <MdIcons.MdPowerOff/></th>
        <th>Amount of reduced energy per unit of product</th>
        <td>{f.energyred/f.batch}</td>
        <td>kWh/ unit of product</td>
    </tr>
    <tr>
        <th>Percentage of energy reduced per unit of product</th>
        <td>{f.energyred*100/f.energy}</td>
        <td>%</td>
    </tr>
    <div>SPACE</div>
    </tbody>
    
))


const Examp = ({form}) => {
  return (
    <div>
    <div className="lca-container">
    <div className='lca-indicators'>
        <table className='lca-table'>
        <caption>Life Cycle Assessment Indicators</caption>
        <thead>
            <th>Indicators</th>
            <th>Measurements</th>
            <th>Values</th>
            <th>Units</th>
        </thead>
        <List form= {form}/>
        </table>
    </div>
    </div>
    </div>
  )
}

export default Examp


	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
