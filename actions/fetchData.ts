"use server"

import axios from "@/lib/axios"



export const fetchTemplates = async () => {
  const response = await axios.get('/templates/getTemplates');
  if (!response) return { error: "No Template 😓" }
  if (response) return { success: response }
};

export const fetchPitches = async () => {
    const response = await axios.get(`/pitch/getAll`);
    if (!response) return { error: "No Pitches Found 😓" }
    if (response) return { success: response }
  };
