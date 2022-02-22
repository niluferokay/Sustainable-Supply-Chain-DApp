import React from "react"
import Button from "./FormButton"

const Header = ({ title, formTitle, onAdd, showAdd, onShip, showShip }) => {
    return (
        <header className="header">
            {showAdd ? <h2>{formTitle}</h2> : <h2>{title}</h2> }
            <Button className="btn" 
            onClick={onAdd}
            color={showAdd ? "red": "green"}
            text={showAdd ? "X": <>{formTitle}</>}
            />
        </header>
    )
}

export default Header



