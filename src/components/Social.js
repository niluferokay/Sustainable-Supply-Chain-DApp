import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Web3 from "web3"
import Assessment from "../abis/Assessments.json"

const Social = () => {

    useEffect(() => { 
        const loadWeb3 = async () => {
            if(window.ethereum) {
              window.web3 = new Web3(window.ethereum)
              await window.ethereum.enable()
            } if (window.web3) {
              window.web3 = new Web3(window.web3.currentProvider)
            } else {
              window.alert("Please use Metamask!")
            }
        }
        loadWeb3()}, [])
    
    useEffect(() => { 
        const loadBlockchainData = async () => {
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts()
            setAccount(accounts[0])
            const networkId = await web3.eth.net.getId()
            const networkData = Assessment.networks[networkId]
            if (networkData) {
                //Fetch contract
                const contract = new web3.eth.Contract(Assessment.abi, networkData.address)
                setContract(contract)
                const socialCount = await contract.methods.socialCount().call()
                setSocialCount(socialCount)
            //Load Socials
            for (var i = 1; i <= socialCount; i++) {
                const newSocial = await contract.methods.socials(i).call()
                setSocials(socials =>([...socials, newSocial]))
            }
            }
            else { 
                window.alert("Assessment contract is not deployed to the detected network")
            }
        }
        loadBlockchainData()}, [])
    
    const {register} = useForm();
    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [socialCount, setSocialCount] = useState()
    const [socials, setSocials] = useState([])
    const [date, setDate] = useState("")
    const [d, setD] = useState("")

    const [monthYear, setMonthYear] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [trainh, setTrainh] = useState("")
    const [trainemp, setTrainemp] = useState("")
    const [emp, setEmp] = useState("")
    const [resemp, setResemp] = useState("")
    const [hiredemp, setHiredemp] = useState("")
    const [fullemp, setFullemp] = useState("")
    const [workh, setWorkh] = useState("")
    const [overtimeh, setOvertimeh] = useState("")
    const [empwage, setEmpwage] = useState("")
    const [minwage, setMinwage] = useState("")
    const [insurance, setInsurance] = useState("")
    const [femwage, setFemwage] = useState("")
    const [malwage, setMalwage] = useState("")
    const [fem, setFem] = useState("")
    const [male, setMale] = useState("")
    const [femboard, setFemboard] = useState("")
    const [empboard, setEmpboard] = useState("")
    const [disabled, setDisabled] = useState("")
    const [minority, setMinority] = useState("")
    const [older, setOlder] = useState("")
    const [socialstand, setSocialstand] = useState("")
    const [ilo, setIlo] = useState("")
    const [fire, setFire] = useState("")
    const [medical, setMedical] = useState("")
    const [sanitation, setSanitation] = useState("")
    const [gear, setGear] = useState("")
    const [workacc, setWorkacc] = useState("")
    const [union, setUnion] = useState("")
    const [empunion, setEmpunion] = useState("")
    const [bargain, setBargain] = useState("")
    const [discri, setDiscri] = useState("")
    const [child, setChild] = useState("")
    const [forced, setForced] = useState("")
    const [indig, setIndig] = useState("")
    const [localemp, setLocalemp] = useState("")
    const [localsup, setLocalsup] = useState("")
    const [donation, setDonation] = useState("")
    const [earning, setEarning] = useState("")
    const [corrup, setCorrup] = useState("")
    const [anticomp, setAnticomp] = useState("")
    const [socialsus, setSocialsus] = useState("")
    const [suppliers, setSuppliers] = useState("")
    const [productassess, setProductassess] = useState("")
    const [product, setProduct] = useState("")
    const [productincident, setProductincident] = useState("")
    const [privacy, setPrivacy] = useState("")
    const [leaks, setLeaks] = useState("")
    const [cuscomp, setCuscomp] = useState("")
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const monthNumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    
    const onSubmit = async(e) =>{
        e.preventDefault()
        const socialForm = {  
        id: (parseInt(socialCount)+1).toString(),
        trainh: trainh,
        trainemp: trainemp,
        emp: emp, 
        resemp: resemp, 
        hiredemp: hiredemp, 
        fullemp: fullemp, 
        workh: workh, 
        overtimeh: overtimeh, 
        empwage: empwage, 
        minwage: minwage, 
        insurance: insurance, 
        femwage: femwage,
        malwage: malwage,
        fem: fem,
        male: male,
        femboard: femboard,
        empboard: empboard,
        disabled: disabled,
        minority: minority,
        older: older,
        socialstand: socialstand,
        ilo: ilo,
        fire: fire,
        medical: medical,
        sanitation: sanitation,
        gear: gear,
        workacc: workacc,
        union: union,
        empunion: empunion,
        bargain: bargain,
        discri: discri,
        child: child,
        forced: forced,
        indig: indig,
        localemp: localemp,
        localsup: localsup,
        donation: donation,
        earning: earning,
        corrup: corrup,
        anticomp: anticomp,
        socialsus: socialsus,
        suppliers: suppliers,
        productassess: productassess, 
        product: product,
        productincident: productincident,
        privacy: privacy,
        leaks: leaks,
        cuscomp: cuscomp
    } 
    const document = JSON.stringify(socialForm)
    setD("now")
    await addSocial({date, document, month, year})
    }

    useEffect(() => {
        getDate()
        getMonth()
    }, [d, monthYear])

    const getDate = async () => {
        const today = new Date()
        const d = await today.getDate() +'-'+ (today.getMonth()+1) +'-'+ today.getFullYear()
        const t = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const date = await d + " " + t
        setDate(date)
        console.log(date)
    }

    const getMonth = () => {
        const month = monthYear.toString().substr(-2)
        const year = monthYear.toString().substr(0,4)
        setYear(year)
        for (var i = 0; i <= 11; i++) {
        if (month === monthNumber[i]) {
            setMonth(months[i])
        }
    }}
    
    const addSocial = ({date, document, month, year}) => {
        contract.methods.addSocial(date, document, month, year).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.assign('http://localhost:3000/assessments')
        })
    }

    const handleChange = (name, checked) => {
        checked === true ? setSocialstand((prev) => [...prev, name]) 
        : console.log("")}

    return (
        <div>
            <div className="lca-container">
            <form className="lca-form" onSubmit={onSubmit}>
                <div className="lca-input">
                        <h3>Social Sustainability Assessment</h3>
                        <div className="center">
                            <div>
                        <label>
                            Select Month/ Year  
                            </label>
                            <input 
                                type='month' required
                                value = {monthYear} onChange={(e) => setMonthYear(e.target.value)}
                            />
                        </div>
                        </div>    
                        <fieldset className="monthly-kpi"><legend>Monthly KPI Update</legend>
                            <label 
                            className="form-label">
                            1- Total number of training hours provided to employees per year   
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                                value = {trainh} onChange={(e) => setTrainh(e.target.value)}
                            /> 
                        <div></div>
                            <label 
                            className="form-label">
                            2- Total number of trained employees per year
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {trainemp} onChange={(e) => setTrainemp(e.target.value)}
                            /> 
                        <div></div>
                            <label 
                            className="form-label">
                            3- Total number of employees
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {emp} onChange={(e) => setEmp(e.target.value)}
                            /> 
                        <div></div> 
                            <label 
                            className="form-label">
                            4- Total number of employees who resigned or have been made redundant per year
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()}
                                value = {resemp} onChange={(e) => setResemp(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            5- Total number of hired employees per year 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()}  
                                value = {hiredemp} onChange={(e) => setHiredemp(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            6- Total number of full-time employees 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {fullemp} onChange={(e) => setFullemp(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            7- Average contractual working hours per full-time employee per week
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                                value = {workh} onChange={(e) => setWorkh(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            8- Average overtime hours per employee per week
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                                value = {overtimeh} onChange={(e) => setOvertimeh(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            9- Average employee wage 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                                value = {empwage} onChange={(e) => setEmpwage(e.target.value)}
                                /> <label class="wrap_text"> TL</label> 
                        <div></div> 
                        <label 
                            className="form-label">
                            10- Total number of full-time employees earning below minimum wage
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {minwage} onChange={(e) => setMinwage(e.target.value)}/>
                        <div></div> 
                        <label 
                            className="form-label">
                            11- Total number of employees entitled for health insurance, parental leave, unemployment, disability and invalidity coverage, retirement provision 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {insurance} onChange={(e) => setInsurance(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            12- Average female employee wage
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                                value = {femwage} onChange={(e) => setFemwage(e.target.value)}
                                /> <label class="wrap_text"> TL</label> 
                        <div></div> 
                        <label 
                            className="form-label">
                            13- Average male employee wage
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                                value = {malwage} onChange={(e) => setMalwage(e.target.value)}
                                /> <label class="wrap_text"> TL</label> 
                        <div></div> 
                        <label 
                            className="form-label">
                            14- Total number of female employees
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {fem} onChange={(e) => setFem(e.target.value)}
                            />
                        <div></div> 
                        <label 
                            className="form-label">
                            15- Total number of male employees 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {male} onChange={(e) => setMale(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            16- Total number of female employees in board of director and management positions
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {femboard} onChange={(e) => setFemboard(e.target.value)}/>
                        <div></div> 
                        <label 
                            className="form-label">
                            17- Total number of employees in board of director and management positions
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {empboard} onChange={(e) => setEmpboard(e.target.value)}/> 
                        <div></div>
                        </fieldset>
                        <fieldset className='annual-kpi'><legend>Annual KPI Update</legend> 
                        <label 
                            className="form-label">
                            18- Total number of disabled employees 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {disabled} onChange={(e) => setDisabled(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            19- Total number of minority employees 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {minority} onChange={(e) => setMinority(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            20- Total number of older employees
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {older} onChange={(e) => setOlder(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            21- Choose the external certification(s) regarding social standards and supplier's code of conduct 
                            </label>
                            <div></div>  
                            <input 
                                name = "ISO26000" onChange={(e) => handleChange(e.target.name, e.target.checked)}
                                type="checkbox"/><label class="wrap_text"> ISO26000</label> 
                            <input 
                                name = "SA8000" onChange={(e) => handleChange(e.target.name, e.target.checked)}
                                type="checkbox"/><label class="wrap_text"> SA8000</label>  
                        <div></div> 
                        <label 
                            className="form-label">
                            22- Is there compliance with ILO Guidelines for Occupational Health Management Systems? 
                            </label>
                            <div></div> 
                            <input
                                type="radio"
                                value = "Yes" name = "ilo" checked={ilo === "Yes"} onChange={(e) => setIlo(e.target.value)}/>
                                <label class="wrap_text"> Yes</label>
                            <input 
                                type="radio"
                                value = "No" name = "ilo" checked={ilo === "No"} onChange={(e) => setIlo(e.target.value)}/>
                                <label class="wrap_text"> No</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            23- Is there fire-fighting equipment and emergency exits?
                            </label>
                            <div></div> 
                            <input 
                                type="radio"
                                value = "Yes" name = "fire" checked={fire === "Yes"} onChange={(e) => setFire(e.target.value)}/>
                                <label class="wrap_text"> Yes</label>
                            <input 
                                type="radio"
                                value = "No" name = "fire" checked={fire === "No"} onChange={(e) => setFire(e.target.value)}/>
                                <label class="wrap_text"> No</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            24- Is there provision of medical assistance and first aid?
                            </label>
                            <div></div> 
                            <input 
                                type="radio"
                                value = "Yes" name = "medical" checked={medical === "Yes"} onChange={(e) => setMedical(e.target.value)}/>
                                <label class="wrap_text"> Yes</label>
                            <input 
                                type="radio"
                                value = "No" name = "medical" checked={medical === "No"} onChange={(e) => setMedical(e.target.value)}/>
                                <label class="wrap_text"> No</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            25- Is there access to water and sanitation?
                            </label>
                            <div></div> 
                            <input 
                                type="radio"
                                value = "Yes" name = "sanitation" checked={sanitation === "Yes"} onChange={(e) => setSanitation(e.target.value)}/>
                                <label class="wrap_text"> Yes</label>
                            <input 
                                type="radio"
                                value = "No" name = "sanitation" checked={sanitation === "No"} onChange={(e) => setSanitation(e.target.value)}/>
                                <label class="wrap_text"> No</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            26- Is there provision of protective gear? 
                            </label>
                            <div></div> 
                            <input 
                                type="radio"
                                value = "Yes" name = "gear" checked={gear === "Yes"} onChange={(e) => setGear(e.target.value)}/>
                                <label class="wrap_text"> Yes</label>
                            <input 
                                type="radio"
                                value = "No" name = "gear" checked={gear === "No"} onChange={(e) => setGear(e.target.value)}/>
                                <label class="wrap_text"> No</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            27- Total number of work accidents per year
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {workacc} onChange={(e) => setWorkacc(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            28- Are there union(s) within the organization?
                            </label>
                            <div></div> 
                            <input 
                                type="radio"
                                value = "Yes" name = "union" checked={union === "Yes"} onChange={(e) => setUnion(e.target.value)}/>
                                <label class="wrap_text"> Yes</label>
                            <input 
                                type="radio"
                                value = "No" name = "union" checked={union === "No"} onChange={(e) => setUnion(e.target.value)}/>
                                <label class="wrap_text"> No</label>
                        <div></div> 
                        <label 
                            className="form-label">
                            29- Total number of employees joined to labor unions
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {empunion} onChange={(e) => setEmpunion(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            30- Total number of employees covered by collective bargaining agreements
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {bargain} onChange={(e) => setBargain(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            31- Total number of discrimination incidents in terms of race, gender, sexual orientation, religion, disability, and age
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {discri} onChange={(e) => setDiscri(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            32- Total number of child labor
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {child} onChange={(e) => setChild(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            33- Total number of forced labor
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {forced} onChange={(e) => setForced(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            34- Total number of incidents of violating the rights of indigenous people 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {indig} onChange={(e) => setIndig(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            35- Total number of local employees
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {localemp} onChange={(e) => setLocalemp(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            36- Total number of local suppliers
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {localsup} onChange={(e) => setLocalsup(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            37- Total amount of money donated
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                                value = {donation} onChange={(e) => setDonation(e.target.value)}
                                /> <label class="wrap_text"> TL</label> 
                        <div></div> 
                        <label 
                            className="form-label">
                            38- Total amount of pre-tax earnings 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} step=".001" 
                                value = {earning} onChange={(e) => setEarning(e.target.value)}
                                /> <label class="wrap_text"> TL</label> 
                        <div></div> 
                        <label 
                            className="form-label">
                            39- Total number of incidents of corruption 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {corrup} onChange={(e) => setCorrup(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            40- Total number of legal actions pending or completed regarding anti-competitive behavior 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {anticomp} onChange={(e) => setAnticomp(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            41- Total number of suppliers monitored on labor practices, health and safety, human rights, society and product responsibility issues
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {socialsus} onChange={(e) => setSocialsus(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            42- Total number of suppliers
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {suppliers} onChange={(e) => setSuppliers(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            43- Total number of products and services for which health and safety impacts are assessed
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {productassess} onChange={(e) => setProductassess(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            44- Total number of products and services 
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {product} onChange={(e) => setProduct(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            45- Total number of health and safety incidents concerning products and services
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {productincident} onChange={(e) => setProductincident(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            46- Total number of customer privacy complaints
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {privacy} onChange={(e) => setPrivacy(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            47- Total number of leaks, thefts, or losses of customer data
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {leaks} onChange={(e) => setLeaks(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            48- Total number of customer complaints
                            </label>
                            <input 
                                type='number' min='0' onWheel={(e) => e.target.blur()} 
                                value = {cuscomp} onChange={(e) => setCuscomp(e.target.value)}/> 
                        <div></div>
                        </fieldset> 
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