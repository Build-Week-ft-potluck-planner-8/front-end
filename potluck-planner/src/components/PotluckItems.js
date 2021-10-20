import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utilities/axiosWithAuth';


export default function PotluckItems() {

    const [ itemFields, setItemFields ] = useState({food_name: '', food_description:''})
    
    const handleChange = ( e) =>{
        setItemFields({
            ...itemFields, 
            [e.target.name]: e.target.value
        })
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth().post(`/foods`, itemFields)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log({ err }))
    }

    useEffect(() => {
        axiosWithAuth().get(`/foods`)
        .then(res => {
            console.log(res)
        })
    })

    return (
        <form onSubmit={handleSubmit}>
          
            <label htmlFor='food_name'>Item</label>
             <input
                id='food_name'
                name='food_name'
                value={itemFields.food_name}
                onChange={e => handleChange(e)}
             /> 
             <label htmlFor='food_description'>Description</label>
             <input
                id='food_description'
                name='food_description'
                value={itemFields.food_description}
                onChange={e => handleChange( e)}
             /> 
            
             <button>Add items</button>
        </form>
    )
}
