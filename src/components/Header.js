import Button from "./FormButton"
import React, { useState, useEffect } from "react"

const Header = ({ title, formTitle, onAdd, showAdd, addShipment, account}) => {

    const [date, setDate] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [place, setAddress] = useState("")
    const [shipType, setShipType] = useState("")
    const [d, setD] = useState("")

    const getLocation = () => {      
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates,  handleError, {enableHighAccuracy: true})
        }    
    }

    const handleError = () => {
        alert("Geolocation API is not supported in your browser. Please enable Geolocation")
    }
  
    const getCoordinates = async(position) => {
        const accuracy = await position.coords.accuracy
        console.log(accuracy)
            if ( accuracy <= 50000000) {
                const lat  = await position.coords.latitude.toString()
                console.log("lat", lat)
                const long = await position.coords.longitude.toString()
                console.log("long", long)
                setLatitude(lat)
                setLongitude(long)
                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyA1NTVyRpS9yu9w8Otq1K3r-SwMJMvrhNY`;
                console.log(url)
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    const place = data.results[0].formatted_address
                setAddress(place)
                console.log(place)})        
            } else {
                setTimeout(getLocation, 50000) 
            }
    }

    const getDate = async () => {
        const today = new Date()
        const d = await today.getDate() +'-'+ (today.getMonth()+1) +'-'+ today.getFullYear()
        const t = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const date = await d + " " + t
        setDate(date)
        console.log(date)
    }
    
    useEffect(() => { 
            getDate()
            getLocation()
        }, [d])

    const getSentLocationDate = async() => {
        const shipType = "Shipment Sent"
        setShipType(shipType)
        console.log(shipType)
        setD("now")
        await addShipment({shipType, place, latitude, longitude, date, account})
    }

    const getRecLocationDate = async () => {
        const shipType = "Shipment Received"
        setShipType(shipType)
        setD("now")
        await addShipment({shipType, place, latitude, longitude, date, account})
    }

    return (
        <header className="dashheader">
            <div className="shipment-btns">
                <Button 
                onClick={getSentLocationDate}
                color="orange"
                text="Send Shipment"
                />
                <Button 
                onClick={getRecLocationDate}
                color="gold"
                text="Receive Shipment"
                />
            </div>    
        {showAdd ? "" : <h2>{title}</h2> }
        <Button className="btn" 
        onClick= {onAdd}
        color= {showAdd ? "#f2f2f2" : "#3eb049"}
        text= {showAdd ? "": <>{formTitle}</>}
        />
    </header>
    )
}

export default Header
