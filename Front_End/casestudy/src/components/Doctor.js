import React , {useState, useEffect} from 'react';
import axios from 'axios'

export default function Doctor(props) {
    const [doctorsList , setDoctorsList] = useState({})
    
    
    useEffect(() => {
        if (doctorsList.length === undefined) {
            axios.get('http://localhost:8082/finddoctor', {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            } ).then((Responce) => {
            setDoctorsList(Responce.data)
            console.log(Responce.data)
        }).catch((err) => {
            console.log("catched" + err)
        }
        )
        }
    }, [])
    console.log(doctorsList)
        
    return (
            <div className="container">
                <h1>doctor</h1>
            </div> 
    )
}
