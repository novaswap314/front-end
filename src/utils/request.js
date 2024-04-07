import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_URL, // url = base url + request url
  timeout: 60000, // request timeout
});

export function setupAxios() {
  // request interceptor
  service.interceptors.request.use(
    config => {
      return config
    },
    error => {
      // do something with request error
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      try {
        return Promise.reject(error)
      } catch (e) {
        console.log('error caught', e);
      }
    }
  )
}

export default service;
