import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import {useFetchUser} from "../api/authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const {user} = useFetchUser();
    const [crops, setCrops] = useState([]); // Holds user information
    const [loadingCrops, setLoadingCrops] = useState(true); // Tracks session validation status

    useEffect(() => {

    if(!user) return;

    const fetchCrops = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/harvests/crops`, {withCredentials: true, params: { farmer_id: user?.id }});
            setCrops(res.data)
        } catch (error) {
            console.error("Error fetching crops:", error);
        } finally {
            setLoadingCrops(false);
        }
    };

    fetchCrops();
  },[user?.id]);
  return (
    <DataContext.Provider value={{crops, setCrops, loadingCrops}}>
        {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);