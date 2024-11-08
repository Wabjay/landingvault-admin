"use client"
import { useEffect, useState } from "react";
import ListPitches from "@/sections/Pitches";
import { store } from "@/stores/store";
import { useFetchData } from "@/lib/fetchData";
// import { Pitch } from "@/types";  // Assuming you have a types file where Pitch type is defined

const DynamicListComponent = () => {
  const { getPitches } = useFetchData();
const {componentLoading, pitches} = store()



  useEffect(() => {
    getPitches()
    console.log(pitches)
  }, [componentLoading]);

  
 // @ts-ignore: Ignore TypeScript errors for the next line
  return  <ListPitches pitches={pitches} />
  
};

export default DynamicListComponent;
