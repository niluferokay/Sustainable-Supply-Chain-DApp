import React, { useState, useEffect} from 'react'
import Sidebar from '../Sidebar'
import Assess from '../Assessment'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
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
          console.log(networkId)
          const networkData = Assessment.networks[networkId]
          console.log(networkData)
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
              for (var i = 1; i <= assessmentCount; i++) {
                  const newAssessment = await contract.methods.assessments(i).call()
                  setForm(assessments =>([...assessments, JSON.parse(newAssessment.document)]))
              }
              // setMerge(assessments.map(t1 => ({...t1, ...form.find(t2 => t2.id === t1.id)})))
              }
          else { 
              window.alert("Assessments contract is not deployed to the detected network")
          }
      }
      loadBlockchainData()}, [])

  const [contract, setContract] = useState([])
  const [account, setAccount] = useState([])        
  const [assessmentCount, setAssessmentCount] = useState()        
  const [assessments, setAssessments] = useState([])
  const [document, setDocument] = useState([])
  const [form, setForm] = useState([])
  const [showForm, setShowForm] = useState([])

  const merge = (assessments.map(t1 => ({...t1, ...form.find(t2 => t2.id === t1.id)})))
  console.log(form)
  console.log(assessments)

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

  return (
    <div className="assess-container">
    <header className="lca-dashheader">
            <div className="lca-container">
                <Button className="btn" 
                onClick={routeE}
                color="green"
                text="Environmental Assessment"
                />
                <Button className="btn" 
                onClick={routeS}
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
    <Assess assessments={merge} handleClick={handleClick} showForm={showForm} setShowForm={setShowForm}/>
    <Sidebar/>
    </div>
  )
}

export default Assessments