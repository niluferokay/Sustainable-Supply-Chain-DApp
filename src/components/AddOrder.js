import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const AddOrder = ({addOrder, products, account, onAdd}) => {
    const {register} = useForm();

    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [unit, setUnit] = useState("")
    const [date, setDate] = useState("")
    
    useEffect(() => {
            getDate()
    }, [date])

    const getDate = async () => {
        const today = new Date()
        const d = await today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        const t = await today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        const date = await d + " " + t
        setDate(date)
        console.log(date)
    }
    
    const onSubmit = async(e) => {
        e.preventDefault()
        console.log(name)
        console.log(quantity)
        console.log(unit)
        addOrder({name, quantity, unit, date, account})

        setQuantity("") 
    }

    return (
        <div className="form-content">
            <form className="order-form" onSubmit={onSubmit}>
            <div className="form-header">
                <h2>Add Order</h2>
                <button className="btn form-close" style= {{background:"red"}} onClick={onAdd}>X</button>
            </div>                
                <div className="form-inputs">
                    <label htmlFor="name"
                    className="form-label">
                    Select a product</label>
                    <select 
                        className="form-input"
                        {...register("name", {required: true })}
                        value = {name} onChange={(e) => setName(e.target.value)}
                    >
                    <option value=""disabled selected hidden></option>
                    <option value="T-shirt">T-shirt</option>
                    {/* {products.map(product => { 
                    return <option value={product.name}> {product.name} </option>
                    })} */}
                    </select>
                </div>
                <div className="form-inputs">
                    <label htmlFor="quantity"
                    className="form-label">
                    Quantity / Unit
                    </label>
                        <input 
                            id="quantity"
                            type="text"
                            name="quantity"
                            className="quantity"
                            placeholder="Enter quantity"
                            {...register("quantity", {required: true })}
                            value = {quantity} onChange={(e) => setQuantity(e.target.value)}
                        />
                        <select 
                            className="unit"
                            {...register("unit", {required: true })}
                            value = {unit} onChange={(e) => setUnit(e.target.value)}                        
                        >
                            <option value=""disabled selected hidden></option>
                            <option value="kg">kg</option>
                            <option value="items">items</option>
                        </select>
                    </div>
                <button className="btn form-input-btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddOrder
