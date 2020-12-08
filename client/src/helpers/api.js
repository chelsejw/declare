import axios from 'axios'
import { API_URL } from '../constants'

const requests = {
  checkEmail: (email) => {
    return axios.post(`${API_URL}/exists`, { email })
  },

  login: (email, password) => {
    return axios.post(`${API_URL}/login`, {
      email,
      password,
    })
  },

  register: ({
    email,
    password,
    full_name,
    ga_email,
    mobile,
    cohort,
    user_type,
  }) => {
    return axios.post(`${API_URL}/register`, {
      email,
      full_name,
      password,
      ga_email,
      mobile,
      cohort,
      user_type,
    })
  },

  update: ({
    email,
    full_name,
    ga_email,
    active,
    mobile,
    cohort,
    user_type,
  }) => {
    return axios.patch(`${API_URL}/update`, {
      email,
      full_name,
      ga_email,
      active,
      mobile,
      cohort,
      user_type,
    })
  },

  getScheduledTime: () => {
    return axios.get(`${API_URL}/scheduled`)
  },

  getCohortList: () => {
    return axios.get(`${API_URL}/cohorts`)
  },
}

export default requests
