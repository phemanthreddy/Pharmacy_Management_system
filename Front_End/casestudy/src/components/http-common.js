import axios from "axios";

 
export default axios.create({

    baseURL: 'http://localhost:8081/auth',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem("SavedToken")
    }
});