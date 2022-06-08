import React, { useState, useEffect } from 'react'
import Web3 from "web3"
import Assessment from "../../abis/Assessments.json"
import {Bar, Line} from "react-chartjs-2"
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Sidebar from '../Sidebar';
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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
        const networkId = await web3.eth.net.getId()
        const networkData = Assessment.networks[networkId]
        if (networkData) {
            //Fetch contract
            const contract = new web3.eth.Contract(Assessment.abi, networkData.address)
            const socialCount = await contract.methods.socialCount().call()
            //Load Socials
            for (var i = 1; i <= socialCount; i++) {
                const newSocial = await contract.methods.socials(i).call()
                setSocials(socials =>([...socials, newSocial]))
                setFormAccount(socials =>([...socials, (newSocial.account)]))
                setMonth(socials =>([...socials, newSocial.month]))
                setYear(socials =>([...socials, newSocial.year]))
  
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

  const [socials, setSocials] = useState([])  
  const [socialform, setSocialForm] = useState([])
  const [month, setMonth] = useState([])
  const [year, setYear] = useState([])
  const [formAccount, setFormAccount] = useState([])
  const [formMonth, setFormMonth] = useState("")
  const [formYear, setFormYear] = useState("")
  const [company, setCompany] = useState("")
  const [data, setData] = useState([])

  const [optionsH, setOptionsH] = useState({})
  const [optionsM, setOptionsM] = useState({})

  const [empChartData, setEmpChartData] = useState({
    datasets: [],
  });
  const [wageChartData, setWageChartData] = useState({
    datasets: [],
  });
  const [donationChartData, setDonationChartData] = useState({
    datasets: [],
  });
  const [trainChartData, setTrainChartData] = useState({
    datasets: [],
  });
  const [genderChartData, setGenderChartData] = useState({
    datasets: [],
  });
  const [divChartData, setDivChartData] = useState({
    datasets: [],
  });
  const [hiredChartData, setHiredChartData] = useState({
    datasets: [],
  });
  const [hoursChartData, setHoursChartData] = useState({
    datasets: [],
  });
  const [humanChartData, setHumanChartData] = useState({
    datasets: [],
  });
  const [incidentsChartData, setIncidentsChartData] = useState({
    datasets: [],
  });
  const [customerChartData, setCustomerChartData] = useState({
    datasets: [],
  });
  const [productChartData, setProductChartData] = useState({
    datasets: [],
  });
  const [unionChartData, setUnionChartData] = useState({
    datasets: [],
  });
  const [supplierChartData, setSupplierChartData] = useState({
    datasets: [],
  });

  const dataE = (socials.map(t1 => ({...t1, ...socialform.find(t2 => t2.id === t1.id)})))

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
    if (formMonth === "All" && formYear === "All")  {
      const data = (dataE.filter(obj => obj.account.includes(company)))
      .map(p => (p))
      setData(data)  
    }
  }

  const charts = async () => {

    const id = data.map(a => (a.month + " " + a.year))
    const emp = data.map(a => parseInt(a.emp))    
    const trainh = data.map(a => parseInt(a.trainh)/parseInt(a.trainemp))
    const trainemp = data.map(a => parseInt(a.trainemp))
    const resemp = data.map(a => parseInt(a.resemp))
    const hiredemp = data.map(a => parseInt(a.hiredemp))
    const fullemp = data.map(a => parseInt(a.fullemp))
    const partemp = data.map(a => (parseInt(a.emp) - parseInt(a.fullemp))) 
    const workh = data.map(a => parseInt(a.workh))
    const overtimeh = data.map(a => parseInt(a.overtimeh))
    const empwage = data.map(a => parseInt(a.empwage))
    const minwage = data.map(a => parseInt(a.minwage))
    const insurance = data.map(a => parseInt(a.insurance))
    const femwage = data.map(a => parseInt(a.femwage))
    const malwage = data.map(a => parseInt(a.malwage))
    const fem = data.map(a => parseInt(a.fem))
    const male = data.map(a => parseInt(a.male))
    const femboard = data.map(a => parseInt(a.femboard))
    const empboard = data.map(a => parseInt(a.empboard))
    const disabled = data.map(a => parseInt(a.disabled))
    const minority = data.map(a => parseInt(a.minority))
    const older = data.map(a => parseInt(a.older))
    const workacc = data.map(a => parseInt(a.minority))
    const empunion = data.map(a => parseInt(a.empunion))
    const bargain = data.map(a => parseInt(a.bargain))
    const discri = data.map(a => parseInt(a.discri))
    const child = data.map(a => parseInt(a.child))
    const forced = data.map(a => parseInt(a.forced))
    const indig = data.map(a => parseInt(a.indig))
    const localemp = data.map(a => parseInt(a.localemp))
    const localsup = data.map(a => parseInt(a.localsup))
    const donation = data.map(a => parseInt(a.donation))
    const earning = data.map(a => parseInt(a.earning))
    const corrup = data.map(a => parseInt(a.corrup))
    const anticomp = data.map(a => parseInt(a.anticomp))
    const socialsus = data.map(a => parseInt(a.socialsus))
    const productassess = data.map(a => parseInt(a.productassess))
    const product = data.map(a => parseInt(a.product))
    const productincident = data.map(a => parseInt(a.productincident))
    const privacy = data.map(a => parseInt(a.privacy))
    const leaks = data.map(a => parseInt(a.leaks))
    const cuscomp = data.map(a => parseInt(a.cuscomp))
    const suppliers = data.map(a => parseInt(a.suppliers))

    setDonationChartData({
      labels: id,
      datasets: [
        {
          label: "Donations to Charity",
          data: donation,
          borderColor: "rgb(252, 217, 0)",
          backgroundColor: "rgba(252, 217, 0)",
        },
        {
          label: "Company Pre-tax Earnings ",
          data: earning,
          borderColor: "rgb(184,225,133)",
          backgroundColor: "rgba(184,225,133)",
        },
      ]
    },
    setOptionsM({
      responsive: true,
      scales: {
        y: {
        title: {
            display: true,
            text: 'Money (TL)',
            }
        }
    },
    })
    );

    setTrainChartData({
      labels: id,
      datasets: [
        {
          label: "Average Training Hours per Employee per Year",
          data: trainh,
          borderColor: "rgb(233, 196, 106)",
          backgroundColor: "rgba(233, 196, 106)",
        },
      ],
    },);

    setIncidentsChartData({
      labels: id,
      datasets: [
        {
          label: "Work Accidents",
          data: workacc,
          borderColor: "rgb(34, 34, 59)",
          backgroundColor: "rgba(34, 34, 59)",
        },
        {
          label: "Rights of Indigenous People Violation",
          data: indig,
          borderColor: "rgb(74, 78, 105)",
          backgroundColor: "rgba(74, 78, 105)",
        },
        {
          label: "Discrimination incidents",
          data: discri,
          borderColor: "rgb(108, 117, 125)",
          backgroundColor: "rgba(108, 117, 125)",
        },
        {
          label: "Corruption Incidents",
          data: corrup,
          borderColor: "rgb(154, 140, 152)",
          backgroundColor: "rgba(154, 140, 152)",
        },
        {
          label: "Legal Actions Regarding Anti-competitive Behavior",
          data: anticomp,
          borderColor: "rgb(201, 173, 167)",
          backgroundColor: "rgba(201, 173, 167)",
        },
      ],
    },);

    setUnionChartData({
      labels: id,
      datasets: [
        {
          label: "Employees Joined to Labor Unions",
          data: empunion,
          borderColor: "rgb(64, 121, 140)",
          backgroundColor: "rgba(64, 121, 140)",
        },
        {
          label: "Employees Covered by Collective Bargaining Agreements",
          data: bargain,
          borderColor: "rgb(112, 169, 161)",
          backgroundColor: "rgba(112, 169, 161)",
        },
        {
          label: "Employees",
          data: emp,
          borderColor: "rgb(158, 193, 163)",
          backgroundColor: "rgba(158, 193, 163)",
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    },);

    setDivChartData({
      labels: id,
      datasets: [
        {
          label: "Disabled Employees",
          data: disabled,
          borderColor: "rgb(248, 150, 30)",
          backgroundColor: "rgba(248, 150, 30)",
        },
        {
          label: "Minority Employees",
          data: minority,
          borderColor: "rgb(67, 170, 139)",
          backgroundColor:"rgba(67, 170, 139)",
        },
        {
          label: "Employees with Age Over 65",
          data: older,
          borderColor: "rgb(144, 190, 109)",
          backgroundColor:"rgba(144, 190, 109)",
        },
        {
          label: "Local Employees",
          data: localemp,
          borderColor: "rgb(215, 185, 213)",
          backgroundColor: "rgba(215, 185, 213)",
        },
        {
          label: "Employees",
          data: emp,
          borderColor: "rgb(243, 114, 44)",
          backgroundColor:"rgba(243, 114, 44)",
        },
      ],
    });

    setEmpChartData({
      labels: id,
      datasets: [
        {
          label: "Full-time Employees",
          data: fullemp,
          borderColor: "rgb(0, 119, 182)",
          backgroundColor: "rgba(0, 119, 182)",
        },
        {
          label: "Part-time Employees",
          data: partemp,
          borderColor: "rgb(118,111,178)",
          backgroundColor: "rgba(118,111,178)",
        },
        {
          label: "Trained Employees per Year",
          data: trainemp,
          borderColor: "rgb(144, 190, 109)",
          backgroundColor: "rgba(144, 190, 109)",
        },
        {
          label: "Employees Entitled for Insurace",
          data: insurance,
          borderColor: "rgb(136, 204, 241)",
          backgroundColor:"rgba(136, 204, 241)",
        },
        {
          label: "Employees Earning Below Minimum Wage",
          data: minwage,
          borderColor: "rgb(187, 62, 3)",
          backgroundColor:"rgba(187, 62, 3)",
        },
        {
          label: "Employees",
          data: emp,
          borderColor: "rgb(45, 106, 79)",
          backgroundColor: "rgba(45, 106, 79)",
        },
      ],
    });

    setWageChartData({
      labels: id,
      datasets: [
        {
          label: "Average Employee Wage",
          data: empwage,
          borderColor: "rgb(142, 202, 230)",
          backgroundColor: "rgba(142, 202, 230)",
        },
        {
          label: "Average Wage of Female Employees",
          data: femwage,
          borderColor: "rgb(144, 190, 109)",
          backgroundColor: "rgba(144, 190, 109)",
        },
        {
          label: "Average Wage of Male Employees",
          data: malwage,
          borderColor: "rgb(45, 106, 79)",
          backgroundColor: "rgba(45, 106, 79)",
        },
      ],
    });

    setGenderChartData({
      labels: id,
      datasets: [
        {
          label: "Female Employees",
          data: fem,
          borderColor: "rgb(171,217,233)",
          backgroundColor: "rgba(171,217,233)",
        },
        {
          label: "Male Employees",
          data: male,
          borderColor: "rgb(98,195,165)",
          backgroundColor: "rgba(98,195,165)",
        },
        {
          label: "Female Board Members",
          data: femboard,
          borderColor: "rgb(252, 217, 0)",
          backgroundColor: "rgba(252, 217, 0)",
        },
        {
          label: "Board Members",
          data: empboard,
          borderColor: "rgb(184,225,133)",
          backgroundColor: "rgba(184,225,133)",
        },
      ],
    },);

    setHoursChartData({
      labels: id,
      datasets: [
        {
          label: "Weekly Work Hours",
          data: workh,
          borderColor: "rgb(236,113,20)",
          backgroundColor: "rgba(236,113,20)",
        },
        {
          label: "Weekly Overtime Hours",
          data: overtimeh,
          borderColor: "rgb(226,117,174)",
          backgroundColor: "rgba(226,117,174)",
        },
      ],
    },
    setOptionsH({
      responsive: true,
      scales: {
        y: {
        title: {
            display: true,
            text: 'Hours',
            }
        }
    },
    }));

    setHiredChartData({
      labels: id,
      datasets: [
        {
          label: "Hired Employees",
          data: hiredemp,
          borderColor: "rgb(33, 158, 188)",
          backgroundColor: "rgba(33, 158, 188)",
        },
        {
          label: "Employees Who Resigned or Have Been Made Redundant",
          data: resemp,
          borderColor: "rgb(2, 48, 71)",
          backgroundColor: "rgba(2, 48, 71)",
        },
      ],
    });

    setHumanChartData({
      labels: id,
      datasets: [
        {
          label: "Child Labor",
          data: child,
          borderColor: "rgb(88, 49, 1)",
          backgroundColor: "rgba(88, 49, 1)",
        },
        {
          label: "Forced Labor",
          data: forced,
          borderColor: "rgb(190, 140, 99)",
          backgroundColor: "rgba(190, 140, 99)",
        },
      ],
    });

    setCustomerChartData({
      labels: id,
      datasets: [
        {
          label: "Customer Complaints",
          data: cuscomp,
          borderColor: "rgb(49,135,189)",
          backgroundColor: "rgba(49,135,189)",
        },
        {
          label: "Customer Privacy Complaints",
          data: privacy,
          borderColor: "rgb(217, 237, 146)",
          backgroundColor: "rgba(217, 237, 146)",
        },
        {
          label: "Customer Data Leaks, Thefts, or Losses",
          data: leaks,
          borderColor: "rgb(120, 147, 138)",
          backgroundColor: "rgba(120, 147, 138)",
        },
      ]});

    setProductChartData({
      labels: id,
      datasets: [
        {
          label: "Products",
          data: product,
          borderColor: "rgb(142, 202, 230)",
          backgroundColor: "rgba(142, 202, 230)",
        },
        {
          label: "Products with Health and Safety Impact Assessment",
          data: productassess,
          borderColor: "rgb(144, 190, 109)",
          backgroundColor: "rgba(144, 190, 109)",
        },
        {
          label: "Product Health and Safety Incidents",
          data: productincident,
          borderColor: "rgb(45, 106, 79)",
          backgroundColor: "rgba(45, 106, 79)",
        },
      ],
    });

    setSupplierChartData({
      labels: id,
      datasets: [
        {
          label: "Suppliers Monitored on Social Sustainability",
          data: socialsus,
          borderColor: "rgb(249, 132, 74)",
          backgroundColor: "rgba(249, 132, 74)",
        },
        {
          label: "Local Suppliers",
          data: localsup,
          borderColor: "rgb(190, 140, 99)",
          backgroundColor: "rgba(190, 140, 99)",
        },
        {
          label: "Suppliers",
          data: suppliers,
          borderColor: "rgb(249, 199, 79)",
          backgroundColor: "rgba(249, 199, 79)",
        },
      ],
    });
  }

  const unique = [...new Set(formAccount.map(item => item))]
  const uniqueMonth = [...new Set(month.map(item => item))]
  const uniqueYear = [...new Set(year.map(item => item))]

  useEffect(() => { 
      filter()
  }, [company, formMonth, formYear]);

  useEffect(() => { 
      charts()
  }, [data]);

  return (
    <div>
      <Sidebar/>
      <div className='charts-header'>
        <h2>Social Sustainability Report</h2>
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
        <Bar className='line' data={empChartData}/>
        </div>
        <div>
        <Line className='line' data={trainChartData} options={optionsH}/>
        </div>
        <div>
        <Line className='line' data={hoursChartData} options={optionsH}/>
        </div>
        <div>
        <Bar className='line' data={wageChartData} options={optionsM}/>
        </div>
        <div>
        <Bar className='line' data={genderChartData}/>
        </div>
        <div>
        <Bar className='line' data={divChartData}/>
        </div>
        <div>
        <Bar className='line' data={unionChartData}/>
        </div>
        <div>
        <Line className='line' data={hiredChartData}/>
        </div>
        <div>
        <Line className='line' data={humanChartData}/>
        </div>
        <div>
        <Bar className='line' data={incidentsChartData}/>
        </div>
        <div>
        <Line className='line' data={donationChartData} options={optionsM}/>
        </div>
        <div>
        <Line className='line' data={supplierChartData}/>
        </div>
        <div>
        <Line className='line' data={productChartData}/>
        </div>
        <div>
        <Line className='line' data={customerChartData}/>
        </div>

      </div>
    </div>
  )
}

export default SocialReport