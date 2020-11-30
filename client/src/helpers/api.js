import axios from "axios";
import {API_URL} from '../constants';

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

  register: ({ email, password, full_name, ga_email, mobile }) => {
    return axios.post(`${API_URL}/register`, {
      email,
      full_name,
      password,
      ga_email,
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
