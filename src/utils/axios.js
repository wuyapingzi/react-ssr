import axios from 'axios'

let config = {
  baseURL: 'http://localhost:9090'
}
const axiosInstance = axios.create(config)

axiosInstance.interceptors.response.use(
  (resp) => {
    const res =resp.data
    return res
  },
  (err) => {
    console.error(err)
    return Promise.reject(err)
  }
)

export default axiosInstance