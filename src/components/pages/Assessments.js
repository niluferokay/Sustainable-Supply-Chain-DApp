import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
import Button from "../FormButton"
import Enviro from '../EnviroIndicators'
import Social from '../SocialIndicators'
import LCI from '../LCIIndicators'

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
          const networkId = await web3.eth.net.getId()
          const networkData = Assessment.networks[networkId]
          if (networkData) {
              //Fetch contract
              const contract = new web3.eth.Contract(Assessment.abi, networkData.address)
              const LCICount = await contract.methods.LCICount().call()
              const enviroCount = await contract.methods.enviroCount().call()
              const socialCount = await contract.methods.socialCount().call()
              //Load LCIs
              for (var i = 1; i <= LCICount; i++) {
                  const newLCI = await contract.methods.LCIs(i).call()
                  setLCIs(LCIs =>([...LCIs, newLCI]))
              }
              for (var i = 1; i <= LCICount; i++) {
                  const newLCI = await contract.methods.LCIs(i).call()
                  setLCIForm(LCIs =>([...LCIs, JSON.parse(newLCI.document)]))
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

    const [LCIs, setLCIs] = useState([]) 
    const [LCIform, setLCIForm] = useState([])       
    const [enviros, setEnviros] = useState([])
    const [enviroform, setEnviroForm] = useState([])
    const [socials, setSocials] = useState([])  
    const [socialform, setSocialForm] = useState([])

    const merge = (LCIs.map(t1 => ({...t1, ...LCIform.find(t2 => t2.id === t1.id)})))
    const Emerge = (enviros.map(t1 => ({...t1, ...enviroform.find(t2 => t2.id === t1.id)})))
    const Smerge = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))
    
    let navigate = useNavigate(); 
    const routeLCI = () =>{ 
      let path = `/forms/lci`; 
      navigate(path);}
    const routeS = () =>{ 
      let path = `/forms/social`; 
      navigate(path);}
    const routeE = () =>{ 
      let path = `/forms/enviro`; 
      navigate(path);}

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
                  onClick={routeLCI}
                  color="#03a0dd"
                  text="Life Cycle Inventory"
                  />
      </header>
      <Enviro Emerge={Emerge}/>
      <Social Smerge={Smerge}/>
      <LCI assessments={merge}/>
      <Sidebar/>
      </div>
    )
}

export default Assessments