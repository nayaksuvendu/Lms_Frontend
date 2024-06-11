import axios from "axios"

// metion the backendUrl
const Base_url = 'https://lms-backend-69df.onrender.com/api/v1' || 'http://localhost:5173/api/v1'

//create insatnce of axios
const axiosinstance=axios.create()

axiosinstance.defaults.baseURL=Base_url;

axiosinstance.defaults.withCredentials=true;

export default axiosinstance;