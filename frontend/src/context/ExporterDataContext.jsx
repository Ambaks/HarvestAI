import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import {useFetchUser} from "../api/authService";

/* UNDER CONSTRUCTION, CURRENTLY DOES NOT WORK, BUT I DO WANT THE FARMER AND EXPORTER DATA CONTEXT TO EVENTUALLY BE SEPERATE */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const DataContext = createContext();

export const ExporterDataProvider = ({ children }) => {
    const {user} = useFetchUser();
    const [harvests, setHarvests] = useState([]);
    const [transactions, setTransactions] = useState([]); //Holds user transaction info
    const [loadingTransactions, setLoadingTransactions] = useState(true); 
    const [earningsData, setEarningsData] = useState([]);
    const [exporterCrops, setExporterCrops] = useState([]);

    const fetchExporterCrops = async () => {
      try {
        console.log("Fetching exporter crops...");
          const res = await axios.get(`${API_BASE_URL}/exporter-crops/${user?.id}`, { withCredentials: true });
          setExporterCrops(res.data);
          console.log("Exporter crops found: ", res.data)
      } catch (error) {
          console.error("Error fetching exporter crops:", error);
      }
  };


    const fetchTransactions = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/transactions`, {withCredentials: true, params: { farmer_id: user?.id }});
            setTransactions(res.data)
        } catch (error) {
            console.error("Error fetching crops:", error);
        } finally {
            setLoadingTransactions(false);
        }
    };


    const fetchHarvests = async () => {
      try {
          const res = await axios.get(`${API_BASE_URL}/harvests`, {withCredentials: true, params: { farmer_id: user?.id }});
          console.log("Harvest data:", res.data)
          setHarvests(res.data)
      } catch (error) {
          console.error("Error fetching crops:", error);
      } 
  };


    const fetchEarnings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/earnings`, {withCredentials: true, params: { user_id: String(user?.id) }});
        setEarningsData(response.data);
        console.log("Earnings Data:", earningsData);
      } catch (error) {
        console.error("Error fetching earnings:", error);
      }
    };
    

      const resetData = () => {
        setEarningsData(() => []);
        setLastHarvest(() => null);
        setHarvests(() => []);
        setTransactions(() => []);
      };


    useEffect(() => {
        if (!user) return;
        fetchTransactions(); 
        fetchEarnings();
        fetchHarvests();
        fetchExporterCrops();
    }, [user?.id]);

  return (
    <DataContext.Provider value={{fetchTransactions, transactions, setTransactions, loadingTransactions, earningsData, setEarningsData, fetchEarnings, fetchHarvests, harvests, setHarvests, resetData, exporterCrops, setExporterCrops, fetchExporterCrops}}>
        {children}  
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
