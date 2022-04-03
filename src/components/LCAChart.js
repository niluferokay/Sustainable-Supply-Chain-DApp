import React, { useState, useEffect } from 'react'
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

const LCAChart = ({data}) => {

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

  const [energy, setEnergy] = useState([])
  const [renewenergy, setRenewenergy] = useState([])
  const [water, setWater] = useState([])
  const [waterrec, setWaterrec] = useState([])
  const [material, setMaterial] = useState([])
  const [materialrec, setMaterialrec] = useState([])
  const [ghg, setGhg] = useState([])
  const [waterpol, setWaterpol] = useState([])
  const [soilpol, setSoilpol] = useState([])
  const [air, setAir] = useState([])
  const [hazmat, setHazmat] = useState([])
  const [solidwaste, setSolidwaste] = useState([])
  const [waterwaste, setWaterwaste] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [id, setId] = useState([])

  const charts = async () => {
    setEnergy(data.map(a => parseInt(a.energy)))
    setId(data.map(a => parseInt(a.process)))
    setWater(data.map(a => parseInt(a.water)))
    setWaterrec(data.map(a => parseInt(a.waterrec)))
    setMaterial(data.map(a => parseInt(a.material)))
    setMaterialrec(data.map(a => parseInt(a.materialrec)))
    setGhg(data.map(a => parseInt(a.ghg)))
    setWaterpol(data.map(a => parseInt(a.waterpol)))
    setSoilpol(data.map(a => parseInt(a.soilpol)))
    setAir(data.map(a => parseInt(a.air)))
    setHazmat(data.map(a => parseInt(a.hazmat)))
    setSolidwaste(data.map(a => parseInt(a.solidwaste)))
    setWaterwaste(data.map(a => parseInt(a.waterwaste)))

    setEnergyChartData({
      labels: id,
      datasets: [
        {
          label: "Energy Consumption",
          data: energy,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
        {
          label: "Renewable energy Consumption",
          data: renewenergy,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    setWaterChartData({
      labels: id,
      datasets: [
        {
          label: "Water Consumption",
          data: water,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
        {
          label: "Recycled or Reused Water Consumption",
          data: waterrec,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    setMaterialChartData({
      labels: id,
      datasets: [
        {
          label: "Material Consumption",
          data: material,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
        {
          label: "Recycled or Reused Material Consumption",
          data: materialrec,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    setGhgChartData({
      labels: id,
      datasets: [
        {
          label: "Greenhouse Gas Emission",
          data: ghg,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    setPollutionChartData({
      labels: id,
      datasets: [
        {
          label: "Water Pollution",
          data: waterpol,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
        {
          label: "Soil Pollution",
          data: soilpol,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
        {
          label: "Air Pollution",
          data: air,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
        {
          label: "Hazardous Material Consumption",
          data: hazmat,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    setWasteChartData({
      labels: id,
      datasets: [
        {
          label: "Solid Waste",
          data: solidwaste,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
        {
          label: "Water Waste",
          data: waterwaste,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  useEffect(() => { 
  charts()
  }, [data]);
  
  return (
    <>
      <div className='charts'>
        <div>
        <Line className='line' data={energyChartData}/>
        </div>
        <div>
        <Line className='line' data={waterChartData}/>
        </div>
        <div>
        <Line className='line' data={materialChartData}/>
        </div>
        <div>
        <Line className='line' data={ghgChartData}/>
        </div>
        <div>
        <Line className='line' data={pollutionChartData}/>
        </div>
        <div>
        <Line className='line' data={wasteChartData}/>
        </div>
      </div>
    </>
  )

}

export default LCAChart
