import React from 'react'
import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Timeline = ({shipments, product}) => {

  return (
    <div className='time-margin'>
        <div className='timeline'>
        {product !== "" ? 
        <VerticalTimeline> 
            {shipments.filter(obj => obj.product.includes(product)).map(e => {
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
                                {e.process}
                            </h3>
                            <button className='time-title-btn'>
                              <Link to="lci" state={e.process} style={{ textDecoration: 'none', color: "black"}}>Life Cycle Inventory </Link>
                            </button>                                
                            </div>
                            <h4 className="vertical-timeline-element-subtitle">
                                {e.account === "0xf00EbF44706A84d73698D51390a6801215fF338c" ? "Supplier#1":
                                e.account === "0x2074b4e9bE42c7724C936c16795C42c04e83d7ae" ? "Supplier#2":
                                e.account === "0xa686525B5A5c9353c649b9Ef7f387a9B92085619" ? "Supplier#3":
                                e.account === "0x5e66410a4C6443d035E05162C9bb59708cB0596F" ? "Supplier#4":
                                e.account === "0x3421668462324bFB48EA07D0B12243091CD09759" ? "Company": null}
                            </h4>
                            <button className='as-btn'>
                              <Link to="assessments" state={e.account} style={{ textDecoration: 'none', color: "black"}}>
                              Environmental and Social Sustainability Assessment</Link>
                            </button>
                            <h4 className='description'>{e.shipType}: {e.date}</h4>               
            
                        </VerticalTimelineElement>
                    )
                })
              } 
        </VerticalTimeline> : null}
        </div>
    </div>
  )
}

export default Timeline