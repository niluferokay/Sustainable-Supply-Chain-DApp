import React, { useState } from 'react'

const Social = () => {
    
    const [water, setWater] = useState("")

    const onSubmit = (e) =>{
        e.preventDefault()
    }
    return (
            <div>
            <div className="lca-container">
            <form className="lca-form" onSubmit={onSubmit}>
                <div className="lca-input">
                        <h3>Social Sutainability Assessment</h3>
                            <label 
                            className="form-label">
                            1- Total number of training hours provided to employees per year   
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> L/kg-lint
                        <div></div>
                            <label 
                            className="form-label">
                            2- Total number of trained employees per year
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> kg/ha
                        <div></div>
                            <label 
                            className="form-label">
                            3- Total number of employees
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> kg/ha
                        <div></div> 
                            <label 
                            className="form-label">
                            4- Total number of employees who resigned or have been made redundant per year
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> kg/ha
                        <div></div> 
                        <label 
                            className="form-label">
                            5- Total number of hired employees per year 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> MJ/bale
                        <div></div> 
                        <label 
                            className="form-label">
                            6- Total number of full-time employees 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> MJ/bale
                        <div></div> 
                        <label 
                            className="form-label">
                            7- Average contractual working hours per full-time employee per week
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> MJ/bale
                        <div></div> 
                        <label 
                            className="form-label">
                            8- Average overtime hours per employee per week
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> L/kg textile
                        <div></div> 
                        <label 
                            className="form-label">
                            9- Average employee wage 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/kg textile
                        <div></div> 
                        <label 
                            className="form-label">
                            10- Total number of full-time employees earning below minimum wage
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> MJ/kg textile
                        <div></div> 
                        <label 
                            className="form-label">
                            11- Total number of employees entitled for health insurance, parental leave, unemployment, disability and invalidity coverage, retirement provision 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> MJ/bale
                        <div></div> 
                        <label 
                            className="form-label">
                            12- Average female employee wage
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> MJ/bale
                        <div></div> 
                        <label 
                            className="form-label">
                            13- Average male employee wage
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> MJ/bale
                        <div></div> 
                        <label 
                            className="form-label">
                            14- Total number of female employees
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}
                            /> L/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            15- Total number of male employees 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            16- Total number of female employees in board of director and management positions
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> MJ/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            17- Total number of employees in board of director and management positions
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            18- Total number of disabled employees 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            19- Total number of minority employees 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            20- Total number of older employees
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            21- Choose the external certification(s) regarding social standards and supplier's code of conduct 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            22- Is there compliance with ILO Guidelines for Occupational Health Management Systems? 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            23- Is there fire-fighting equipment and emergency exits?
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            24- Is there provision of medical assistance and first aid?
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            25- Is there access to water and sanitation?
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            26- Is there provision of protective gear? 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            27- Total number of work accidents per year
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            28- Are there union(s) within the organization?
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            29- Total number of employees joined to labor unions
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            30- Total number of employees covered by collective bargaining agreements
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            31- Total number of discrimination incidents in terms of race, gender, sexual orientation, religion, disability, and age
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            32- Total number of child labor
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            33- Total number of forced labor
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            34- Total number of incidents of violating the rights of indigenous people 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            35- Total number of local employees
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            36- Total number of local suppliers
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            37- Total amount of money donated
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            38- Total amount of pre-tax earnings 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            39- Total number of incidents of corruption 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            40- Total number of legal actions pending or completed regarding anti-competitive behavior 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            41- Total number of suppliers monitored on labor practices, health and safety, human rights, society and product responsibility issues
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            42- Total number of suppliers
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            43- Total number of products and services for which health and safety impacts are assessed
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            44- Total number of products and services 
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            45- Total number of health and safety incidents concerning products and services
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            46- Total number of customer privacy complaints
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            47- Total number of leaks, thefts, or losses of customer data
                            </label>
                            <input 
                                type="text"
                                value = {water} onChange={(e) => setWater(e.target.value)}/> kg/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            48- Total number of customer complaints
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

export default Social