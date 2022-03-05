import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../Sidebar'
import Assess from '../Assessment'
import Web3 from "web3"
import Assessment from "../../abis/Assessment.json"
import Button from "../FormButton"
import { useNavigate } from 'react-router-dom'

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
              const assessmentCount = await contract.methods.assessmentCount().call()
              setAssessmentCount(assessmentCount)
              //Load assessments
              for (var i = 1; i <= assessmentCount; i++) {
                  const newAssessment = await contract.methods.assessments(i).call()
                  setAssessments(assessments =>([...assessments, newAssessment]))
              }
              }
          else { 
              window.alert("Origin contract is not deployed to the detected network")
          }
      }
      loadBlockchainData()}, [])

  const [contract, setContract] = useState([])
  const [account, setAccount] = useState([])        
  const [assessmentCount, setAssessmentCount] = useState()        
  const [assessments, setAssessments] = useState([])

  let navigate = useNavigate(); 
  const routeLCA = () =>{ 
    let path = `lca`; 
    navigate(path);}

  return (
    <div className="assess-container">
    <header className="lca-dashheader">
            <div className="lca-container">
                <Button className="btn" 
                // onClick={routeEnviro}
                color="green"
                text="Environmental Assessment"
                />
                <Button className="btn" 
                // onClick={routeLCA}
                color="orange"
                text="Social Assessment"
                />
                <Button className="btn" 
                onClick={routeLCA}
                color="lightblue"
                text="Life Cycle Assessment"
                />
            </div>    
    </header>
    <Assess assessments={assessments}/>
    <Sidebar/>
    </div>
  )
}

export default Assessments