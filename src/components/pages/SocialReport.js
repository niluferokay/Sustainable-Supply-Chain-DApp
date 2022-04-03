import React, { useState, useEffect } from 'react'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
import {Line} from "react-chartjs-2"
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import Sidebar from '../Sidebar';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
)

const SocialReport = () => {

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
  const [socialCount, setSocialCount] = useState()
  const [socials, setSocials] = useState([])  
  const [date, setDate] = useState("")
  const [document, setDocument] = useState([])
  const [socialform, setSocialForm] = useState([])

  const data = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))

  return (
    <div>
      <Sidebar/>
    </div>
  )
}

export default SocialReport