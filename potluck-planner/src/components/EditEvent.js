import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utilities/axiosWithAuth';
import { useHistory, useParams } from 'react-router-dom';

export default function AddEvent() {
    const { push } = useHistory();
    const { id } = useParams();

    const [formValues, setFormValues] = useState({
        potluck_name: '',
        potluck_description:'',
        potluck_date: '',
        potluck_time: '',
        potluck_location: '',
        food:''
    });
    
    useEffect(() => {
        axiosWithAuth().get(`/potlucks/${id}`)
            .then(res => {
                setFormValues(res.data);
            })
            .catch(err => {console.log({ err })
            })
    },[id])

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth().put(`/potlucks`, formValues)
        .then(res => {
            setFormValues(res.data)
            push('/upcomingevents')
        })
        .catch(err => console.log(err))
        
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor= 'potluck_name'>Potluck Name</label>
             <input
                id='potluck_name'
                value={formValues.name}
                name='name'
                onChange={handleChange}
                />
            <label htmlFor= 'potluck_time'>Time</label>
            <label htmlFor= 'potluck_description'>Potluck Description</label>
             <input
                id='potluck_description'
                value={formValues.description}
                name='description'
                type='text'
                onChange={handleChange}
             />
             <input 
                id='time'
                value={formValues.time}
                name='time'
                type='time'
                onChange={handleChange}
                />
            <label htmlFor='potluck_date'>Date</label>
             <input 
                id='date'
                value={formValues.date}
                name='date'
                type='date'
                onChange={handleChange}
             />
            <label htmlFor='potluck_location'>Location</label> 
             <input
                id='location'
                value={formValues.location}
                name='location'
                onChange={handleChange}
             />
            <button>Save Changes</button>
        </form>
    )
}
