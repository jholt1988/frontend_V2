// src/services/authService.js
import api from './axiosInstance';
const handshake = async() => {
    const res1 =await api.get("/?EIO=4&transport=polling")
    console.log(res1)
    console.log(res1.data, typeof res1.data)
    const res1JSON = res1.data.substring(1)
    const JSONdata =  JSON.parse(res1JSON)
    console.log(JSONdata)
    return JSONdata["sid"]

}


export const loginUser = async (userData) => {

 

  const res = await api.post('/auth/login', userData);
  console.log(res)
  return res.data
  }


export const registerUser = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};
