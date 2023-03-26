import React, { useState, useEffect} from 'react'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
import {Bar} from "react-chartjs-2"
import Sidebar from '../Sidebar';
import {
  Chart,
  BarElement,
  PointElement,
  BarController,
  LineController,
  PieController,
} from 'chart.js';
Chart.register(
  BarElement,
  PointElement,
  BarController,
  LineController,
  PieController,
)

const LCIReport = () => {

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
              //Load LCIs
              for (var i = 1; i <= LCICount; i++) {
                  const newLCI = await contract.methods.LCIs(i).call()
                  setLCIs(LCIs =>([...LCIs, newLCI]))
                  setMonth(LCIs =>([...LCIs, newLCI.month]))
                  setYear(LCIs =>([...LCIs, newLCI.year]))
              }
              for (var i = 1; i <= LCICount; i++) {
                  const newLCI = await contract.methods.LCIs(i).call()
                  setForm(LCIs =>([...LCIs, JSON.parse(newLCI.document)]))
                  setProduct(LCIs =>([...LCIs, JSON.parse(newLCI.document).product]))
              }
              }
          else { 
              window.alert("Assessment contract is not deployed to the detected network")
          }
      }
      loadBlockchainData()}, [])
  
    const [LCIs, setLCIs] = useState([])        
    const [form, setForm] = useState([])
    const [product, setProduct] = useState([])
    const [month, setMonth] = useState([])
    const [year, setYear] = useState([])
    const [formProduct, setFormProduct] = useState("")
    const [formMonth, setFormMonth] = useState("")
    const [formYear, setFormYear] = useState("")
    const [data, setData] = useState([])
    const chart = ["energyChartData", "waterChartData", "materialChartData"]

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

    const [landChartData, setLandChartData] = useState({
      datasets: [],
    });
    
    const [optionsE, setOptionsE] = useState({})
    const [optionsW, setOptionsW] = useState({})
    const [optionsWa, setOptionsWa] = useState({})
    const [optionsG, setOptionsG] = useState({})
    const [optionsM, setOptionsM] = useState({})
    const [optionsL, setOptionsL] = useState({})

    const dataE = form.map((item, i) => Object.assign({}, item, LCIs[i]))

    const unique = [...new Set(product.map(item => item))]
    const uniqueMonth = [...new Set(month.map(item => item))]
    const uniqueYear = [...new Set(year.map(item => item))]

    console.log(unique)

    const filter = () => {
      if (formMonth === "All") {
        const data = (dataE.filter(obj => obj.product.includes(formProduct)))
        .filter(obj => obj.year.includes(formYear)).map(p => (p))
        setData(data)
        }
      if (formYear === "All") {
        const data = (dataE.filter(obj => obj.product.includes(formProduct)))
        .filter(obj => obj.month.includes(formMonth)).map(p => (p))
        setData(data)
        }
      if (formMonth !== "All" && formYear !== "All") {
        const data = (dataE.filter(obj => obj.product.includes(formProduct)))
        .filter(obj => obj.month.includes(formMonth))
        .filter(obj => obj.year.includes(formYear)).map(p => (p))
        setData(data)
      }
      if (formMonth === "All" && formYear === "All") {
        const data = (dataE.filter(obj => obj.product.includes(formProduct)))
        .map(p => (p))
        setData(data)  
      }
    }
    
    useEffect(() => { 
      filter()
    }, [formProduct, formMonth, formYear]);

    useEffect(() => { 
        charts()
    }, [data]);

    const charts = async() => {
      const energy = data.map(a => parseInt(a.energy))
      const renewenergy = data.map(a => parseInt(a.renewenergy))
      const id = data.map(a => (a.process + " (" + a.month + " " + a.year + ")"))
      const water = data.map(a => parseInt(a.water))
      const waterrec = data.map(a => parseInt(a.waterrec))
      const material = data.map(a => parseInt(a.material))
      const materialrec = data.map(a => parseInt(a.materialrec))
      const ghg = data.map(a => parseFloat(a.ghg))
      const waterpol = data.map(a => parseInt(a.waterpol))
      const landpol = data.map(a => parseInt(a.landpol))
      const air = data.map(a => parseFloat(a.air))
      const hazmat = data.map(a => parseInt(a.hazmat))
      const solidwaste = data.map(a => parseInt(a.solidwaste))
      const waterwaste = data.map(a => parseInt(a.waterwaste))
      const hazwaste = data.map(a => parseInt(a.hazwaste))
      const solidwasterec = data.map(a => parseInt(a.solidwasterec))
      const waterwasterec = data.map(a => parseInt(a.waterwasterec))
  
      // const energy = data.map(a => parseInt(a.energy)/parseInt(a.batch))
      // const renewenergy = data.map(a => parseInt(a.renewenergy)/parseInt(a.batch))
      // const id = data.map(a => (a.process + " (" + a.month + " " + a.year + ")"))
      // const water = data.map(a => parseInt(a.water)/parseInt(a.batch))
      // const waterrec = data.map(a => parseInt(a.waterrec)/parseInt(a.batch))
      // const material = data.map(a => parseInt(a.material)/parseInt(a.batch))
      // const materialrec = data.map(a => parseInt(a.materialrec)/parseInt(a.batch))
      // const ghg = data.map(a => parseFloat(a.ghg)/parseInt(a.batch))
      // const waterpol = data.map(a => parseInt(a.waterpol)/parseInt(a.batch))
      // const landpol = data.map(a => parseInt(a.landpol)/parseInt(a.batch))
      // const air = data.map(a => parseFloat(a.air)/parseInt(a.batch))
      // const hazmat = data.map(a => parseInt(a.hazmat)/parseInt(a.batch))
      // const solidwaste = data.map(a => parseInt(a.solidwaste)/parseInt(a.batch))
      // const waterwaste = data.map(a => parseInt(a.waterwaste)/parseInt(a.batch))
      // const hazwaste = data.map(a => parseInt(a.hazwaste)/parseInt(a.batch))
      // const solidwasterec = data.map(a => parseInt(a.solidwasterec)/parseInt(a.batch))
      // const waterwasterec = data.map(a => parseInt(a.waterwasterec)/parseInt(a.batch))
      setEnergyChartData({
        labels: id,
        datasets: [
          {
            label: "Energy Consumption",
            data: energy,
            borderColor: "rgb(252, 217, 0)",
            backgroundColor: "rgb(252, 217, 0)",
          },
          {
            label: "Renewable energy Consumption",
            data: renewenergy,
            borderColor: "rgb(184,225,133)",
            backgroundColor: "rgb(184,225,133)",
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
            backgroundColor: "rgba(171,217,233)",
          },
          {
            label: "Recycled or Reused Water Consumption",
            data: waterrec,
            borderColor: "rgb(98,195,165)",
            backgroundColor: "rgba(98,195,165)",
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
            backgroundColor: "rgba(253,174,97)",
          },
          {
            label: "Recycled or Reused Material Consumption",
            data: materialrec,
            borderColor: "rgb(226,117,174)",
            backgroundColor: "rgba(226,117,174)",
          },
          {
            label: "Hazardous Material Consumption",
            data: hazmat,
            borderColor: "rgb(118,111,178)",
            backgroundColor: "rgba(118,111,178)",
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
            backgroundColor: "rgba(213,49,36)",
          },
          {
            label: "Air Pollution",
            data: air,
            borderColor: "rgb(108, 117, 125)",
            backgroundColor: "rgba(108, 117, 125)",
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
              text: 'Emmision (tonnes)',
              }
          }
      },
      }));
  
      setLandChartData({
        labels: id,
        datasets: [
          {
            label: "Land Pollution",
            data: landpol,
            borderColor: "rgb(236,113,20)",
            backgroundColor: "rgba(236,113,20)",
          },
        ],
      },
      setOptionsL({
        responsive: true,
        scales: {
          y: {
          title: {
              display: true,
              text: 'Land area (m2)',
              }
          }
      },
      }));
  
      setPollutionChartData({
        labels: id,
        datasets: [
          {
            label: "Solid Waste",
            data: solidwaste,
            borderColor: "rgb(88, 49, 1)",
            backgroundColor: "rgba(88, 49, 1)",
          },
          {
            label: "Recycled or Reused Solid Waste",
            data: solidwasterec,
            borderColor: "rgb(190, 140, 99)",
            backgroundColor: "rgba(190, 140, 99)",
          },
          {
            label: "Hazardous Waste",
            data: hazwaste,
            borderColor: "rgb(201, 24, 74)",
            backgroundColor:"rgba(201, 24, 74)",
          },
        ],
      },
      setOptionsWa({
        responsive: true,
        scales: {
          y: {
          title: {
              display: true,
              text: 'Waste (kg)',
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
            borderColor: "rgb(217, 237, 146)",
            backgroundColor: "rgba(217, 237, 146)",
          },
          {
            label: "Water Waste",
            data: waterwaste,
            borderColor: "rgb(120, 147, 138)",
            backgroundColor: "rgba(120, 147, 138)",
          },
          {
            label: "Recycled or Reused Water Waste",
            data: waterwasterec,
            borderColor: "rgb(49,135,189)",
            backgroundColor: "rgba(49,135,189)",
          },
        ]});}

    return (
      <>
        <Sidebar/>
        <div className='charts-header'>
          <h2>Life Cycle Inventory Report</h2>
        </div>
        <div className="center-chart">
              <div  className='label-sel'>
                <label>Select Product</label>
                  <select 
                      value = {formProduct} onChange={(e) => setFormProduct(e.target.value)}
                  >
                  <option value=""disabled selected hidden></option>
                  {unique.map(a => {  
                  return <option value={a}>{a} </option>
                  })}
                  </select>
            </div>
              <div>
                <label>Filter by Date</label>
                  <select 
                      value = {formMonth} onChange={(e) => setFormMonth(e.target.value)}
                  >
                  <option value=""disabled selected hidden></option>
                  {uniqueMonth.map(a => {  
                  return <option value={a}>{a} </option>
                  })}
                  </select>
                  <select 
                      value = {formYear} onChange={(e) => setFormYear(e.target.value)}
                  >
                  <option value=""disabled selected hidden></option>
                  {uniqueYear.map(a => {  
                  return <option value={a}>{a} </option>
                  })}
                  </select>
            </div>
        </div>
        <div className='charts'>
          <div>
          <Bar className='line' data={energyChartData} options={optionsE}/>
          </div>
          <div>
          <Bar className='line' data={waterChartData} options={optionsW}/>
          </div>
          <div>
          <Bar className='line' data={materialChartData} options={optionsM}/>
          </div>
          <div>
          <Bar className='line' data={ghgChartData} options={optionsG}/>
          </div>
          <div>
          <Bar className='line' data={pollutionChartData} options={optionsWa}/>
          </div>
          <div>
          <Bar className='line' data={landChartData} options={optionsL}/>
          </div>
          <div>
          <Bar className='line' data={wasteChartData} options={optionsW}/>
          </div>
        </div>
      </>
    )

}
export default LCIReport
