// "use server"
import { store } from "@/stores/store";
import axios from "./axios";


export const useFetchData = () => {
  const { fetchPages, fetchTemplates } = store();


  // Function to go back to the previous page
  const getPages = async () => {
    try {
      const response = await axios.get(`/pitchdeck/pages`)
        fetchPages(response?.data); // Assuming fetchPitches expects the array directly
        console.log(response.data); // Log fetched data for debugging
        return response.data;

    } catch (error) {
      console.error("Error fetching pages:", error);
      throw new Error("Failed to fetch pages");
    }
  };

  const getTemplates = async () => {
    try {
      const response = await axios.get('/pitchdeck/pages');
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching templates:", error);
      throw new Error("Failed to fetch templates");
    }
  };


  const shuffleArray = (pages: { data: any }) => {
    if (pages.data) {
      const shuffledArray = [...pages.data];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    }
    return [];
  };

  return {
    getPages,
    getTemplates,
    shuffleArray
  };
};