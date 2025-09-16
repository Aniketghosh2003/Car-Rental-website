import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Set base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "RS";

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  // Fetch user data
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch cars
  const fetchCars = async () => {
    try {
      //console.log("Fetching cars...");
      const { data } = await axios.get("/api/user/cars");
      //console.log("Response:", data);
      
      if (data.success) {
        setCars(data.cars);
        //console.log("Cars loaded:", data.cars.length);
        return data.cars;
      } else {
        toast.error(data.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars. Please try again.");
      return [];
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common["Authorization"] = '';
    navigate("/");
    toast.success("Logged out successfully");
  };

  // Initialize
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    
    // Fetch cars on app load
    fetchCars();
  }, []);

  // Set auth headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    }
  }, [token]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
