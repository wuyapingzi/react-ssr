import axios from 'axios'

export const serverAxios = axios.create({
  baseURL: 'http://localhost:9090/'
})
export const clientAxios = axios.create({
  baseURL: '/'
})

serverAxios.interceptors.response.use(
  (resp) => {
    const res =resp.data
    return res
  },
  (err) => {
    console.error(err)
    return Promise.reject(err)
  }
)
clientAxios.interceptors.response.use(
  (resp) => {
    const res =resp.data
    return res
  },
  (err) => {
    console.error(err)
    return Promise.reject(err)
  }
)
