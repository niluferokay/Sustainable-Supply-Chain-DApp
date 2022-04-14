import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
import Button from "../FormButton"
import Enviro from '../EnviroIndicators'
import Social from '../SocialIndicators'
import LCA from '../LCAIndicators'

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
              const LCACount = await contract.methods.LCACount().call()
              const enviroCount = await contract.methods.enviroCount().call()
              const socialCount = await contract.methods.socialCount().call()
              //Load LCAs
              for (var i = 1; i <= LCACount; i++) {
                  const newLCA = await contract.methods.LCAs(i).call()
                  setLCAs(LCAs =>([...LCAs, newLCA]))
              }
              for (var i = 1; i <= LCACount; i++) {
                  const newLCA = await contract.methods.LCAs(i).call()
                  setLCAForm(LCAs =>([...LCAs, JSON.parse(newLCA.document)]))
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

    const [LCAs, setLCAs] = useState([]) 
    const [LCAform, setLCAForm] = useState([])       
    const [enviros, setEnviros] = useState([])
    const [enviroform, setEnviroForm] = useState([])
    const [socials, setSocials] = useState([])  
    const [socialform, setSocialForm] = useState([])

    const merge = (LCAs.map(t1 => ({...t1, ...LCAform.find(t2 => t2.id === t1.id)})))
    const Emerge = (enviros.map(t1 => ({...t1, ...enviroform.find(t2 => t2.id === t1.id)})))
    const Smerge = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))
    
    let navigate = useNavigate(); 
    const routeLCA = () =>{ 
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
                  onClick={routeLCA}
                  color="#03a0dd"
                  text="Life Cycle Inventory"
                  />
      </header>
      <Enviro Emerge={Emerge}/>
      <Social Smerge={Smerge}/>
      <LCA assessments={merge}/>
      <Sidebar/>
      </div>
    )
}

export default Assessments