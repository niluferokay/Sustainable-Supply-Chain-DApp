import React, { useState } from 'react'

const Enviro = () => {
  const [water, setWater] = useState("")

  const onSubmit = (e) =>{
      e.preventDefault()
  }

  return (
          <div>
          <div className="lca-container">
          <form className="lca-form" onSubmit={onSubmit}>
              <div className="lca-input">
                      <h3>Enviromental Sutainability Assessment</h3>
                          <label 
                          className="form-label">
                          1- Total amount of energy used per day   
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}
                          /> L/kg-lint
                      <div></div>
                          <label 
                          className="form-label">
                          2- Total amount of energy reduced per day
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}
                          /> kg/ha
                      <div></div>
                          <label 
                          className="form-label">
                          3- Choose the type(s) of renewable energy used
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}
                          /> kg/ha
                      <div></div> 
                          <label 
                          className="form-label">
                          4- Total amount of renewable energy used per day
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}
                          /> kg/ha
                      <div></div> 
                      <label 
                          className="form-label">
                          5- Total amount of water used per day 
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}
                          /> MJ/bale
                      <div></div> 
                      <label 
                          className="form-label">
                          6- Total amount of recycled/reused water used per day 
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}
                          /> MJ/bale
                      <div></div> 
                      <label 
                          className="form-label">
                          7- Total amount of materials other than water used per day
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}
                          /> MJ/bale
                      <div></div> 
                      <label 
                          className="form-label">
                          8- Total amount of reduced materials per day
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}
                          /> L/kg textile
                      <div></div> 
                      <label 
                          className="form-label">
                          9- Total amount of recycled/reused materials used per day
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/kg textile
                      <div></div> 
                      <label 
                          className="form-label">
                          10- Choose the type(s) of recycled/ reused materials used
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> MJ/kg textile
                      <div></div> 
                      <label 
                          className="form-label">
                          11- Total amount of land owned, leased, or managed for production activities or extractive use
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> MJ/bale
                      <div></div> 
                      <label 
                          className="form-label">
                          12- Is there a biodiversity policy?
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> MJ/bale
                      <div></div> 
                      <label 
                          className="form-label">
                          13- Are there activities and operations on protected and sensitive areas? (e.g., IUCN protected area categories 1–4, world heritage sites, and biosphere reserves)
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> MJ/bale
                      <div></div> 
                      <label 
                          className="form-label">
                          14- Total amount of of greenhouse gas emission (CO2, CH4, N2O, HFCs, PFCs, SF6) per day
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}
                          /> L/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          15- Total amount of water pollution generated per day
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          16- Choose the type(s) of water pollution
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> MJ/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          17- Total amount of soil pollution generated per day
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          18- Choose the type(s) of soil pollution
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          19- Total amount of air emission (NOx, SOx)
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          20- Total amount of hazardous materials used per day
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          21- Total amount of solid waste generated per day
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          22- Total amount of waste water generated per day
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          23- Choose the type(s) of solid waste generated
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          24- Choose the type(s) of solid waste destination
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          25- Choose the type(s) of waste water destination
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          26- Choose the external certification(s) regarding environmental standards
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          27- Is there reverse logistics system?
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          28- Choose the type(s) of reverse logistics
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          29- Choose the type(s) of clean technology used?
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          30- Total number of suppliers monitored on environmental sustainability
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
                      <label 
                          className="form-label">
                          31- Total number of suppliers
                          </label>
                          <input 
                              type="text"
                              value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                      <div></div> 
              <button className="btn form-input-btn lca" type="submit">
                  Calculate LCA
              </button>
              </div>
          </form>
          </div>
      </div>
)
}

export default Enviro