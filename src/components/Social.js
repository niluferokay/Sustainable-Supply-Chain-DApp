import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Web3 from "web3"
import Assessment from "../abis/Assessments.json"
const { create } = require("ipfs-http-client")
const ipfs = create({host:"ipfs.infura.io", port:"5001", protocol: "https"})

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
                const assessmentCount = await contract.methods.assessmentCount().call()
                setAssessmentCount(assessmentCount)
                //Load assessments
                for (var i = 1; i <= assessmentCount; i++) {
                    const newAssessment = await contract.methods.assessments(i).call()
                    setAssessments(assessments =>([...assessments, newAssessment]))
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
    const [assessmentCount, setAssessmentCount] = useState()        
    const [assessments, setAssessments] = useState([])
    const [date, setDate] = useState("")
    const [document, setDocument] = useState([])
    const [assessType, setAssessType] = useState("")
    const [d, setD] = useState("")

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
    
    const onSubmit = async(e) =>{
        e.preventDefault()
        const socialForm = {  
        id: assessmentCount,
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
    // console.log(json)
    // const result = await ipfs.add(json)
    // console.log("Ipfs result", result)
    // const document = result.path
    // console.log(document)
    const assessType = "Social Sustainability Assessment"
    setAssessType(assessType)
    setD("now")
    await addAssessment({assessType, document})
    }

    useEffect(() => {
        getDate()
    }, [d])

    const getDate = async () => {
        const today = new Date()
        const d = await today.getDate() +'-'+ (today.getMonth()+1) +'-'+ today.getFullYear()
        const t = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const date = await d + " " + t
        setDate(date)
        console.log(date)
    }

    const addAssessment = ({assessType, document}) => {
        contract.methods.addAssessment(assessType, document).send( {from: account} )
        .once('receipt', (receipt) => {
            window.location.reload()
        })
    }
    return (
            <div>
            <div className="lca-container">
            <form className="lca-form" onSubmit={onSubmit}>
                <div className="lca-input">
                        <h3>Social Sustainability Assessment</h3>
                            <label 
                            className="form-label">
                            1- Total number of training hours provided to employees per year   
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {trainh} onChange={(e) => setTrainh(e.target.value)}
                            /> 
                        <div></div>
                            <label 
                            className="form-label">
                            2- Total number of trained employees per year
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {trainemp} onChange={(e) => setTrainemp(e.target.value)}
                            /> 
                        <div></div>
                            <label 
                            className="form-label">
                            3- Total number of employees
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {emp} onChange={(e) => setEmp(e.target.value)}
                            /> 
                        <div></div> 
                            <label 
                            className="form-label">
                            4- Total number of employees who resigned or have been made redundant per year
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {resemp} onChange={(e) => setResemp(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            5- Total number of hired employees per year 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {hiredemp} onChange={(e) => setHiredemp(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            6- Total number of full-time employees 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {fullemp} onChange={(e) => setFullemp(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            7- Average contractual working hours per full-time employee per week
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {workh} onChange={(e) => setWorkh(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            8- Average overtime hours per employee per week
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {overtimeh} onChange={(e) => setOvertimeh(e.target.value)}
                            /> 
                        <div></div> 
                        <label 
                            className="form-label">
                            9- Average employee wage 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {empwage} onChange={(e) => setEmpwage(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            10- Total number of full-time employees earning below minimum wage
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {minwage} onChange={(e) => setMinwage(e.target.value)}/>
                        <div></div> 
                        <label 
                            className="form-label">
                            11- Total number of employees entitled for health insurance, parental leave, unemployment, disability and invalidity coverage, retirement provision 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {insurance} onChange={(e) => setInsurance(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            12- Average female employee wage
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {femwage} onChange={(e) => setFemwage(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            13- Average male employee wage
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {malwage} onChange={(e) => setMalwage(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            14- Total number of female employees
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {fem} onChange={(e) => setFem(e.target.value)}
                            />
                        <div></div> 
                        <label 
                            className="form-label">
                            15- Total number of male employees 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {male} onChange={(e) => setMale(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            16- Total number of female employees in board of director and management positions
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {femboard} onChange={(e) => setFemboard(e.target.value)}/> MJ/wash
                        <div></div> 
                        <label 
                            className="form-label">
                            17- Total number of employees in board of director and management positions
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {empboard} onChange={(e) => setEmpboard(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            18- Total number of disabled employees 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {disabled} onChange={(e) => setDisabled(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            19- Total number of minority employees 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {minority} onChange={(e) => setMinority(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            20- Total number of older employees
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {older} onChange={(e) => setOlder(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            21- Choose the external certification(s) regarding social standards and supplier's code of conduct 
                            </label>
                            <input 
                                type="checkbox"
                                value = {socialstand} onChange={(e) => setSocialstand(e.target.value)}/> ISO26000
                            <input 
                                type="checkbox"
                                value = {socialstand} onChange={(e) => setSocialstand(e.target.value)}/> SA8000
                        <div></div> 
                        <label 
                            className="form-label">
                            22- Is there compliance with ILO Guidelines for Occupational Health Management Systems? 
                            </label>
                            <input 
                                type="radio"
                                value = {ilo} onChange={(e) => setIlo(e.target.value)}/> Yes 
                            <input 
                                type="radio"
                                value = {ilo} onChange={(e) => setIlo(e.target.value)}/> No
                        <div></div> 
                        <label 
                            className="form-label">
                            23- Is there fire-fighting equipment and emergency exits?
                            </label>
                            <input 
                                type="radio"
                                value = {fire} onChange={(e) => setFire(e.target.value)}/> Yes
                            <input 
                                type="radio"
                                value = {fire} onChange={(e) => setFire(e.target.value)}/> No
                        <div></div> 
                        <label 
                            className="form-label">
                            24- Is there provision of medical assistance and first aid?
                            </label>
                            <input 
                                type="radio"
                                value = {medical} onChange={(e) => setMedical(e.target.value)}/> Yes
                            <input 
                                type="radio"
                                value = {medical} onChange={(e) => setMedical(e.target.value)}/> No
                        <div></div> 
                        <label 
                            className="form-label">
                            25- Is there access to  and sanitation?
                            </label>
                            <input 
                                type="radio"
                                value = {sanitation} onChange={(e) => setSanitation(e.target.value)}/> Yes
                            <input 
                                type="radio"
                                value = {sanitation} onChange={(e) => setSanitation(e.target.value)}/> No
                        <div></div> 
                        <label 
                            className="form-label">
                            26- Is there provision of protective gear? 
                            </label>
                            <input 
                                type="radio"
                                value = {gear} onChange={(e) => setGear(e.target.value)}/> Yes
                            <input 
                                type="radio"
                                value = {gear} onChange={(e) => setGear(e.target.value)}/> No 
                        <div></div> 
                        <label 
                            className="form-label">
                            27- Total number of work accidents per year
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {workacc} onChange={(e) => setWorkacc(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            28- Are there union(s) within the organization?
                            </label>
                            <input 
                                type="radio"
                                value = {union} onChange={(e) => setUnion(e.target.value)}/> Yes
                            <input 
                                type="radio"
                                value = {union} onChange={(e) => setUnion(e.target.value)}/> No
                        <div></div> 
                        <label 
                            className="form-label">
                            29- Total number of employees joined to labor unions
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {empunion} onChange={(e) => setEmpunion(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            30- Total number of employees covered by collective bargaining agreements
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {bargain} onChange={(e) => setBargain(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            31- Total number of discrimination incidents in terms of race, gender, sexual orientation, religion, disability, and age
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {discri} onChange={(e) => setDiscri(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            32- Total number of child labor
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {child} onChange={(e) => setChild(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            33- Total number of forced labor
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {forced} onChange={(e) => setForced(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            34- Total number of incidents of violating the rights of indigenous people 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {indig} onChange={(e) => setIndig(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            35- Total number of local employees
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {localemp} onChange={(e) => setLocalemp(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            36- Total number of local suppliers
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {localsup} onChange={(e) => setLocalsup(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            37- Total amount of money donated
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {donation} onChange={(e) => setDonation(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            38- Total amount of pre-tax earnings 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {earning} onChange={(e) => setEarning(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            39- Total number of incidents of corruption 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {corrup} onChange={(e) => setCorrup(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            40- Total number of legal actions pending or completed regarding anti-competitive behavior 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {anticomp} onChange={(e) => setAnticomp(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            41- Total number of suppliers monitored on labor practices, health and safety, human rights, society and product responsibility issues
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {socialsus} onChange={(e) => setSocialsus(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            42- Total number of suppliers
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {suppliers} onChange={(e) => setSuppliers(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            43- Total number of products and services for which health and safety impacts are assessed
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {productassess} onChange={(e) => setProductassess(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            44- Total number of products and services 
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {product} onChange={(e) => setProduct(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            45- Total number of health and safety incidents concerning products and services
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {productincident} onChange={(e) => setProductincident(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            46- Total number of customer privacy complaints
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {privacy} onChange={(e) => setPrivacy(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            47- Total number of leaks, thefts, or losses of customer data
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {leaks} onChange={(e) => setLeaks(e.target.value)}/> 
                        <div></div> 
                        <label 
                            className="form-label">
                            48- Total number of customer complaints
                            </label>
                            <input 
                                type='number' min='0' 
                                value = {cuscomp} onChange={(e) => setCuscomp(e.target.value)}/> 
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