import React, { useState, useEffect} from 'react'
import Assessment from "./../abis/Assessments.json"
import Web3 from "web3"
import {
    VerticalTimeline,
    VerticalTimelineElement,
  } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Timeline = ({shipments}) => {

    let navigate = useNavigate(); 
    const routeH = () =>{ 
      let path = `harvest`; 
      navigate(path);}
    const routeY = () =>{ 
      let path = `yarn`; 
      navigate(path);}
    const routeF = () =>{ 
      let path = `fabric`; 
      navigate(path);}
    const routeS = () =>{ 
      let path = `sew`; 
      navigate(path);}
    const routeS1 = () =>{ 
      let path = `supplier1`; 
      navigate(path);}
    const routeS2 = () =>{ 
      let path = `supplier2`; 
      navigate(path);}
    const routeS3 = () =>{ 
      let path = `supplier3`; 
      navigate(path);}
    const routeS4 = () =>{ 
      let path = `supplier4`; 
      navigate(path);}
    const company = () =>{ 
      let path = `company`; 
      navigate(path);}

  return (
    <div className='time-margin'>
        <div className='timeline'>
        <VerticalTimeline>
            {
                shipments.map(e => {
                    return(
                        <VerticalTimelineElement
                            date={e.date}
                            iconStyle={{ background: 'black', color: '#fff'}}
                            icon={e.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? <GiIcons.GiCottonFlower/>:
                            e.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? <GiIcons.GiYarn/>: 
                            e.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? <IoIcons.IoColorPaletteOutline/>:
                            e.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? <GiIcons.GiSewingMachine/>:
                            e.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? <AiIcons.AiOutlineShop/>: null}>
                            <div className='time-title'>
                            <h3 >
                                {e.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Harvest":
                                e.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Yarn Manufacturing":
                                e.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? "Fabric Formation and Dyeing":
                                e.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? "Cut and Sew":
                                e.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Retailer": null}
                            </h3>
                            {e.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? <button onClick={routeH} > Life Cycle Assessment </button>:
                                e.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? <button onClick={routeY} > Life Cycle Assessment </button>:
                                e.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? <button onClick={routeF} > Life Cycle Assessment </button>:
                                e.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? <button onClick={routeS} > Life Cycle Assessment </button>: null}                                
                            </div>
                            <h4 className="vertical-timeline-element-subtitle">
                                {e.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier#1":
                                e.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Supplier#2":
                                e.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? "Supplier#3":
                                e.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? "Supplier#4":
                                e.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company": null}
                            </h4>
                                {e.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? <button className='as-btn' onClick={routeS1}>Environmental and Social Sustainability Assessment</button>:
                                e.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? <button className='as-btn' onClick={routeS2}>Environmental and Social Sustainability Assessment</button>:
                                e.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? <button className='as-btn' onClick={routeS3}>Environmental and Social Sustainability Assessment</button>:
                                e.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? <button className='as-btn' onClick={routeS4}>Environmental and Social Sustainability Assessment</button>:
                                e.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? <button className='as-btn' onClick={company}>Environmental and Social Sustainability Assessment</button>: null}                 
                            
                            <h4 className='description'>{e.shipType}: {e.date}</h4>               
            
                        </VerticalTimelineElement>
                    )
                })

            }
        </VerticalTimeline>
        </div>
    </div>
  )
}

export default Timeline