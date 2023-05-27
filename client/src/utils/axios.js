import axios from 'axios'
console.log(process.env.REACT_APP_SERVER_URL)
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})

export default instance