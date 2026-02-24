import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Set base URL
axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000";

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
  const [ratingsByCar, setRatingsByCar] = useState({});

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
        setCars(data.cars || []);
        //console.log("Cars loaded:", data.cars.length);
        return data.cars || [];
      } else {
        toast.error(data.message || "Failed to load cars.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load cars. Please try again."
      );
      return [];
    }
  };

  // Fetch rating summary for cars
  const fetchRatingsSummary = async () => {
    try {
      const { data } = await axios.get("/api/reviews/summary");

      if (data.success && Array.isArray(data.summary)) {
        const map = {};
        data.summary.forEach((item) => {
          if (item._id) {
            map[item._id] = {
              avgRating: item.avgRating,
              reviewCount: item.reviewCount,
            };
          }
        });
        setRatingsByCar(map);
        return map;
      }

      return {};
    } catch (error) {
      console.error("Error fetching ratings summary:", error);
      return {};
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
    fetchRatingsSummary();
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
    ratingsByCar,
    fetchRatingsSummary,
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
