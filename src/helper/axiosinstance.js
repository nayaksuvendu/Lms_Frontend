import axios from "axios"

// metion the backendUrl
const Base_url='http://localhost:4040/api/v1'

//create insatnce of axios
const axiosinstance=axios.create()

axiosinstance.defaults.baseURL=Base_url;

axiosinstance.defaults.withCredentials=true;

export default axiosinstance;