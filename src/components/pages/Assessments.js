import React, { useState, useEffect} from 'react'
import Sidebar from '../Sidebar'
import LCA from '../LCAIndicators'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
import Button from "../FormButton"
import { useNavigate } from 'react-router-dom'
import Enviro from '../EnviroIndicators'
import Social from '../SocialIndicators'

const Assessments = () => {

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
              const LCACount = await contract.methods.LCACount().call()
              setLCACount(LCACount)
              const enviroCount = await contract.methods.enviroCount().call()
              setEnviroCount(enviroCount)
              const socialCount = await contract.methods.socialCount().call()
              setSocialCount(socialCount)
              //Load LCAs
              for (var i = 1; i <= LCACount; i++) {
                  const newLCA = await contract.methods.LCAs(i).call()
                  setLCAs(LCAs =>([...LCAs, newLCA]))
              }
              for (var i = 1; i <= LCACount; i++) {
                  const newLCA = await contract.methods.LCAs(i).call()
                  setForm(LCAs =>([...LCAs, JSON.parse(newLCA.document)]))
              }
              for (var i = 1; i <= LCACount; i++) {
                  const newLCA = await contract.methods.LCAs(i).call()
                  const parse = JSON.parse(newLCA.document)
                  setEnergy(LCAs =>([...LCAs, (parse.energy)]))
                  setMaterial(LCAs =>([...LCAs, (parse.material)]))
              }
              //Load Enviros
              for (var i = 1; i <= enviroCount; i++) {
                  const newEnviro = await contract.methods.enviros(i).call()
                  setEnviros(enviros =>([...enviros, newEnviro]))
              }
              for (var i = 1; i <= enviroCount; i++) {
                  const newEnviro = await contract.methods.enviros(i).call()
                  setEnviroForm(enviros =>([...enviros, JSON.parse(newEnviro.document)]))
              }
              for (var i = 1; i <= enviroCount; i++) {
                const newenviro = await contract.methods.enviros(i).call()
                const parse = JSON.parse(newenviro.document)
                setEnergyE(enviros =>([...enviros, (parse.energy)]))
                setMaterialE(enviros =>([...enviros, (parse.material)]))
            }
              //Load Socials
              for (var i = 1; i <= socialCount; i++) {
                  const newSocial = await contract.methods.socials(i).call()
                  setSocials(socials =>([...socials, newSocial]))
              }
              for (var i = 1; i <= socialCount; i++) {
                  const newSocial = await contract.methods.socials(i).call()
                  setSocialForm(socials =>([...socials, JSON.parse(newSocial.document)]))
              }
              }
          else { 
              window.alert("Assessment contract is not deployed to the detected network")
          }
      }
      loadBlockchainData()}, [])

    const [contract, setContract] = useState([])
    const [account, setAccount] = useState([])        
    const [LCACount, setLCACount] = useState()
    const [LCAs, setLCAs] = useState([])        
    const [enviroCount, setEnviroCount] = useState()
    const [enviros, setEnviros] = useState([])
    const [enviroform, setEnviroForm] = useState([])
    const [socialCount, setSocialCount] = useState()
    const [socials, setSocials] = useState([])  
    const [date, setDate] = useState("")
    const [document, setDocument] = useState([])
    const [form, setForm] = useState([])
    const [energy, setEnergy] = useState([])
    const [energyE, setEnergyE] = useState([])
    const [material, setMaterial] = useState([])
    const [materialE, setMaterialE] = useState([])
    const [socialform, setSocialForm] = useState([])
    const [showForm, setShowForm] = useState([])
    const [showEForm, setShowEForm] = useState([])
    const [showSForm, setShowSForm] = useState([])

    const merge = (LCAs.map(t1 => ({...t1, ...form.find(t2 => t2.id === t1.id)})))
    const Emerge = (enviros.map(t1 => ({...t1, ...enviroform.find(t2 => t2.id === t1.id)})))
    const Smerge = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))
    
    let navigate = useNavigate(); 
    const routeLCA = () =>{ 
      let path = `lca`; 
      navigate(path);}
    const routeS = () =>{ 
      let path = `social`; 
      navigate(path);}
    const routeE = () =>{ 
      let path = `enviro`; 
      navigate(path);}

    const handleClick = (index) => {
      setShowForm(state => ({
        ...state, // <-- copy previous state
        [index]: !state[index] // <-- update value by index key
      }));
    };

    const EhandleClick = (index) => {
      setShowEForm(state => ({
        ...state, // <-- copy previous state
        [index]: !state[index] // <-- update value by index key
      }));
    };
    
    const ShandleClick = (index) => {
      setShowSForm(state => ({
        ...state, // <-- copy previous state
        [index]: !state[index] // <-- update value by index key
      }));
    };

    return (
      <div className="main-container">
      <header className="assess-dashheader">
                  <Button className="btn" 
                  onClick={routeE}
                  color="#279b48"
                  text="Environmental Assessment"
                  />
                  <Button className="btn" 
                  onClick={routeS}
                  color="orange"
                  text="Social Assessment"
                  />
                  <Button className="btn" 
                  onClick={routeLCA}
                  color="#03a0dd"
                  text="Life Cycle Inventory"
                  />
      </header>
      <Enviro Emerge={Emerge} energy={energyE} material={materialE} EClick={EhandleClick} showEForm={showEForm}/>
      <Social Smerge={Smerge} SClick={ShandleClick} showSForm={showSForm}/>
      <LCA assessments={merge} energy={energy} material={material} handleClick={handleClick} showForm={showForm}/>
      <Sidebar/>
      </div>
    )
}

export default Assessments