import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import {useFetchUser} from "../api/authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const {user} = useFetchUser();
    const [harvests, setHarvests] = useState([]);
    const [lastHarvest, setLastHarvest] = useState()
    const [transactions, setTransactions] = useState([]); //Holds user transaction info
    const [loadingTransactions, setLoadingTransactions] = useState(true); 
    const [crops, setCrops] = useState([]); // Holds user information
    const [loadingCrops, setLoadingCrops] = useState(true); // Tracks session validation status
    const [earningsData, setEarningsData] = useState([]);
    const [orders, setOrders] = useState([]);


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

    const fetchLastHarvest = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/harvests/last`, {withCredentials: true, params: {farmer_id: user?.id}});
        setLastHarvest(res.data)
      } catch (error){
        console.error("Error fetching crops:", error);
      } 
    }

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


    const fetchOrders = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/orders`, {
            withCredentials: true,
            params: { user_id: String(user?.id) }});
            
          console.log("Order data:", response.data)
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
    
    const updateOrderStatus = async (orderId, status) => {
        try {
          await axios.patch(
            `${API_BASE_URL}/orders`,
            { order_id: orderId, status: status },
            { withCredentials: true , params: { order_id: String(orderId) }}
          );
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === orderId ? { ...order, status } : order
            )
          );
          // If the order is accepted, refresh transactions to include the new one
            if (status === "Accepted") {
            fetchTransactions();
            }
          fetchOrders();
        } catch (error) {
          console.error(`Error updating order ${orderId}:`, error);
        }
      };


    useEffect(() => {
        if (!user) return;
        fetchCrops();
        fetchTransactions(); // Now fetching transactions too
        fetchEarnings();
        fetchOrders();
        fetchHarvests();
        fetchLastHarvest();
    }, [user?.id]);

  return (
    <DataContext.Provider value={{crops, setCrops, loadingCrops, fetchCrops, lastHarvest, setLastHarvest, fetchLastHarvest, fetchOrders, fetchTransactions, orders, setOrders, transactions, setTransactions, loadingTransactions, earningsData, setEarningsData, fetchEarnings, updateOrderStatus, fetchHarvests, harvests, setHarvests}}>
        {children}  
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
