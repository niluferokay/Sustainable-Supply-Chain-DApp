import React, { useEffect, useState } from 'react'
import LineChart from '../LineChart'
import Sidebar from '../Sidebar'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
import LCAChart from '../LCAChart'
import Report from '../Report'

const Reports = () => {

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
  const [socialform, setSocialForm] = useState([])

  const merge = (LCAs.map(t1 => ({...t1, ...form.find(t2 => t2.id === t1.id)})))
  const Emerge = (enviros.map(t1 => ({...t1, ...enviroform.find(t2 => t2.id === t1.id)})))
  const Smerge = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))

  return (
    <div>
        <Sidebar/>
        <div className="main-container">
        <header className="reports-header"> 
        <h2>Reports</h2> 
        </header>
        <Report enviroCount={enviroCount} socialCount={socialCount} LCACount={LCACount} />
        </div>
    </div>
  )
}

export default Reports