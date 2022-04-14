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

const EnviroReport = () => {

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
          const enviroCount = await contract.methods.enviroCount().call()
          //Load Enviros
          for (var i = 1; i <= enviroCount; i++) {
              const newEnviro = await contract.methods.enviros(i).call()
              setEnviros(enviros =>([...enviros, newEnviro]))
              setFormAccount(enviros =>([...enviros, (newEnviro.account)]))
              setMonth(enviros =>([...enviros, newEnviro.month]))
              setYear(enviros =>([...enviros, newEnviro.year]))
          }
          for (var i = 1; i <= enviroCount; i++) {
              const newEnviro = await contract.methods.enviros(i).call()
              const parse = JSON.parse(newEnviro.document)
              setEnviroForm(enviros =>([...enviros, parse]))
          }
          }
      else { 
          window.alert("Assessment contract is not deployed to the detected network")
      }
  }
    loadBlockchainData()}, [])
  
  const [enviros, setEnviros] = useState([])
  const [enviroform, setEnviroForm] = useState([])
  const [month, setMonth] = useState([])
  const [year, setYear] = useState([])
  const [formAccount, setFormAccount] = useState([])
  const [formMonth, setFormMonth] = useState("")
  const [formYear, setFormYear] = useState("")
  const [company, setCompany] = useState("")
  const [data, setData] = useState([])

  const dataE = (enviros.map(t1 => ({...t1, ...enviroform.find(t2 => t2.id === t1.id)})))

  const unique = [...new Set(formAccount.map(item => item))]

  const [energyChartData, setEnergyChartData] = useState({
    datasets: [],
  });

  const [waterChartData, setWaterChartData] = useState({
    datasets: [],  
  });
  const [materialChartData, setMaterialChartData] = useState({
    datasets: [],
  });

  const [ghgChartData, setGhgChartData] = useState({
    datasets: [],
  });

  const [pollutionChartData, setPollutionChartData] = useState({
    datasets: [],
  });
  const [wasteChartData, setWasteChartData] = useState({
    datasets: [],
  });

  const [optionsE, setOptionsE] = useState({})
  const [optionsW, setOptionsW] = useState({})
  const [optionsG, setOptionsG] = useState({})
  const [optionsM, setOptionsM] = useState({})
  const [optionsP, setOptionsP] = useState({})

  const uniqueMonth = [...new Set(month.map(item => item))]
  const uniqueYear = [...new Set(year.map(item => item))]

  const filter = () => {
    if (formMonth === "All") {
      const data = (dataE.filter(obj => obj.account.includes(company)))
      .filter(obj => obj.year.includes(formYear)).map(p => (p))
      setData(data)
      }
    if (formYear === "All") {
      const data = (dataE.filter(obj => obj.account.includes(company)))
      .filter(obj => obj.month.includes(formMonth)).map(p => (p))
      setData(data)
      }
    if (formMonth !== "All" && formYear !== "All") {
      const data = (dataE.filter(obj => obj.account.includes(company)))
      .filter(obj => obj.month.includes(formMonth))
      .filter(obj => obj.year.includes(formYear)).map(p => (p))
      setData(data)
    }
    else {
      const data = (dataE.filter(obj => obj.account.includes(company)))
      .map(p => (p))
      setData(data)  
    }
  }

  const charts = async () => {
    const energy = data.map(a => parseInt(a.energy))    
    const renewenergy = data.map(a => parseInt(a.renewenergy))
    const id = data.map(a => (a.month + " " + a.year))
    const water = data.map(a => parseInt(a.water))
    const waterrec = data.map(a => parseInt(a.waterrec))
    const material = data.map(a => parseInt(a.material))
    const materialrec = data.map(a => parseInt(a.materialrec))
    const ghg = data.map(a => parseInt(a.ghg))
    const waterpol = data.map(a => parseInt(a.waterpol))
    const soilpol = data.map(a => parseInt(a.soilpol))
    const air = data.map(a => parseInt(a.air))
    const hazmat = data.map(a => parseInt(a.hazmat))
    const solidwaste = data.map(a => parseInt(a.solidwaste))
    const waterwaste = data.map(a => parseInt(a.waterwaste))

    setEnergyChartData({
      labels: id,
      datasets: [
        {
          label: "Energy Consumption",
          data: energy,
          borderColor: "rgb(253,224,138)",
          backgroundColor: "rgba(253,224,138, 0.4)",
        },
        {
          label: "Renewable energy Consumption",
          data: renewenergy,
          borderColor: "rgb(184,225,133)",
          backgroundColor: "rgba(184,225,133, 0.4)",
        },
      ]
    },
    setOptionsE({
      responsive: true,
      scales: {
        y: {
        title: {
            display: true,
            text: 'Energy (kWh)',
            }
        }
    },
    })
    );

    setWaterChartData({
      labels: id,
      datasets: [
        {
          label: "Water Consumption",
          data: water,
          borderColor: "rgb(171,217,233)",
          backgroundColor: "rgba(171,217,233, 0.4)",
        },
        {
          label: "Recycled or Reused Water Consumption",
          data: waterrec,
          borderColor: "rgb(98,195,165)",
          backgroundColor: "rgba(98,195,165, 0.4)",
        },
      ],
    },
    setOptionsW({
      responsive: true,
      scales: {
        y: {
        title: {
            display: true,
            text: 'Water (m3)',
            }
        }
    },
    }));

    setMaterialChartData({
      labels: id,
      datasets: [
        {
          label: "Material Consumption",
          data: material,
          borderColor: "rgb(253,174,97)",
          backgroundColor: "rgba(253,174,97, 0.4)",
        },
        {
          label: "Recycled or Reused Material Consumption",
          data: materialrec,
          borderColor: "rgb(226,117,174)",
          backgroundColor: "rgba(226,117,174, 0.4)",
        },
        {
          label: "Hazardous Material Consumption",
          data: hazmat,
          borderColor: "rgb(118,111,178)",
          backgroundColor: "rgba(118,111,178, 0.4)",
        },
      ],
    },
    setOptionsM({
      responsive: true,
      scales: {
        y: {
        title: {
            display: true,
            text: 'Material (kg)',
            }
        }
    },
    }));

    setGhgChartData({
      labels: id,
      datasets: [
        {
          label: "Greenhouse Gas Emission",
          data: ghg,
          borderColor: "rgb(213,49,36)",
          backgroundColor: "rgba(213,49,36, 0.4)",
        },
        {
          label: "Air Pollution",
          data: air,
          borderColor: "rgb(204,204,204)",
          backgroundColor: "rgba(204,204,204, 0.4)",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    },
    setOptionsG({
      responsive: true,
      scales: {
        y: {
        title: {
            display: true,
            text: 'Water (m3)',
            }
        }
    },
    }));

    setPollutionChartData({
      labels: id,
      datasets: [
        {
          label: "Soil Pollution",
          data: soilpol,
          borderColor: "rgb(236,113,20)",
          backgroundColor: "rgba(236,113,20, 0.4)",
        },
        {
          label: "Solid Waste",
          data: solidwaste,
          borderColor: "rgb(167,86,40)",
          backgroundColor: "rgba(167,86,40, 0.4)",
        },
      ],
    },
    setOptionsP({
      responsive: true,
      scales: {
        y: {
        title: {
            display: true,
            text: 'Water (m3)',
            }
        }
    },
    }));

    setWasteChartData({
      labels: id,
      datasets: [
        {
          label: "Water Pollution",
          data: waterpol,
          borderColor: "rgb(98,190,145)",
          backgroundColor: "rgba(98,190,145, 0.4)",
        },
        {
          label: "Water Waste",
          data: waterwaste,
          borderColor: "rgb(49,135,189)",
          backgroundColor: "rgba(49,135,189, 0.4)",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  
  useEffect(() => { 
      filter()
  }, [company, formMonth, formYear]);

  useEffect(() => { 
      charts()
  }, [data]);
  
  return (
    <>
      <Sidebar/>
      <div className='charts-header'>
        <h2>Environmental Sustainability Report</h2>
      </div>
        <div className="center-chart">
            <div  className='label-sel'>
              <label>Select Company</label>
                <select 
                    value = {company} onChange={(e) => setCompany(e.target.value)}
                >
                <option value=""disabled selected hidden></option>
                {unique.map(a => {  
                return <option value={a}>{
                a === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier#1":
                a === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Supplier#2":
                a === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? "Supplier#3":
                a === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? "Supplier#4":
                a === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company": null} </option>
                })}
                </select>
            </div>
            <div>
                <label>Filter by Date</label>
                  <select 
                      value = {formMonth} onChange={(e) => setFormMonth(e.target.value)}
                  >
                  <option value=""disabled selected hidden></option>
                  <option value = "All" >All</option>
                  {uniqueMonth.map(a => {  
                  return <option value={a}>{a} </option>
                  })}
                  </select>
                  <select 
                      value = {formYear} onChange={(e) => setFormYear(e.target.value)}
                  >
                  <option value=""disabled selected hidden></option>
                  <option value = "All" >All</option>
                  {uniqueYear.map(a => {  
                  return <option value={a}>{a} </option>
                  })}
                  </select>
            </div>
      </div>
      <div></div>
      <div className='charts'>
        <div>
        <Line className='line' data={energyChartData} options={optionsE}/>
        </div>
        <div>
        <Line className='line' data={waterChartData} options={optionsW}/>
        </div>
        <div>
        <Line className='line' data={materialChartData} options={optionsM}/>
        </div>
        <div>
        <Line className='line' data={ghgChartData} options={optionsG}/>
        </div>
        <div>
        <Line className='line' data={pollutionChartData} options={optionsP}/>
        </div>
        <div>
        <Line className='line' data={wasteChartData} options={optionsW}/>
        </div>
      </div>
    </>
  )

}

export default EnviroReport
