import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:7164/api",
    headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
    }
})

// https://localhost:44354
// https://localhost:7164
// http://localhost:5164