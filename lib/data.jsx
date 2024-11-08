import { store } from "@/stores/store";
import axios from "./axios";


  export const Tags = ['All decks', 'Automotive', 'Beauty', 'Biotech', 'Clean energy', 'E-commerce', 'Education', 'Furniture and interior', 'Fashion',
  'Foods and Drinks', 'Gaming', 'Healthcare', 'Real estate', 'News', 'NFT & Crypto', 'Sport', 'HR', 'Manufacturing', 'Finance'
]


export const emailUsers =()=>{
  const {token} = store()
  const res = axios.get(`/auth/emailUsers`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
  return res
}


export const totalUsers =async()=>{
  const {token} = store()
  const res = await axios.get(`/auth/totalUsers`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
  return res
}


export const googleUsers =async()=>{
  const {token} = store()
  const res = await axios.get(`/auth/googleUsers`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
  return res
}


export const totalPitches =async()=>{
  const {token} = store()
  const res = await axios.get(`/pitch/totalPitches`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
  return res
}


export const totalTemplates =async()=>{
  const {token} = store()
  const res = await axios.get(`/templates/totalTemplates`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
  return res
}