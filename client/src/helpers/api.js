import axios from "axios";
const API_URL = "http://localhost:4000";
const requests = {
  checkEmail: (email) => {
    return axios.post(`${API_URL}/exists`, { email });
  },

  login: (email, password) => {
    return axios.post(`${API_URL}/login`, {
      email,
      password,
    });
  },

  register: ({ email, full_name, ga_email, active, mobile }) => {
    return axios.post(`${API_URL}/register`, {
      email,
      full_name,
      ga_email,
      active,
      mobile,
    });
  },

  update: ({ email, full_name, ga_email, active, mobile }) => {
    return axios.patch(`${API_URL}/update`, {
      email,
      full_name,
      ga_email,
      active,
      mobile,
    });
  },
};


export default requests;
