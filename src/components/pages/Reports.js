import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
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
        const networkId = await web3.eth.net.getId()
        const networkData = Assessment.networks[networkId]
        if (networkData) {
            //Fetch contract
            const contract = new web3.eth.Contract(Assessment.abi, networkData.address)
            const LCICount = await contract.methods.LCICount().call()
            setLCICount(LCICount)
            const enviroCount = await contract.methods.enviroCount().call()
            setEnviroCount(enviroCount)
            const socialCount = await contract.methods.socialCount().call()
            setSocialCount(socialCount)
            }
        else { 
            window.alert("Assessment contract is not deployed to the detected network")
        }
    }
    loadBlockchainData()}, [])

  const [LCICount, setLCICount] = useState()
  const [enviroCount, setEnviroCount] = useState()
  const [socialCount, setSocialCount] = useState()

  return (
    <div>
        <Sidebar/>
        <div className="main-container">
        <header className="reports-header"> 
        <h2>Reports</h2> 
        </header>
        <Report enviroCount={enviroCount} socialCount={socialCount} LCICount={LCICount} />
        </div>
    </div>
  )
}

export default Reports