import React from 'react'

const FormButton = ({color, text, onClick}) => {

    return (
        <button onClick={onClick} 
        style={{backgroundColor: color}} 
        className="btn">{text}</button>
    )
}

export default FormButton