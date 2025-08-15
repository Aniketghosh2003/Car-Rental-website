import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const Dashboard = () => {

  const {axios, isOwner, currency} = useAppContext();


  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending Bookings",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Completed Bookings",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="p-6 md:p-8 lg:p-10 text-gray-800">
      <div className="mb-8">
        <Title 
          title="Admin Dashboard" 
          subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
              <img src={card.icon} alt={card.title} className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Title 
            title="Recent Bookings" 
            subTitle="Latest customer bookings"
          />
          <ul className="mt-4 divide-y divide-gray-200">
            {data.recentBookings.map((booking, index) => (
              <li
                key={index}
                className="py-3 grid grid-cols-3 items-center gap-4"
              >
                <div className="flex items-center gap-4 col-span-2">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <img
                      src={assets.listIconColored}
                      alt="booking icon"
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {booking.car.brand} {booking.car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4 col-span-1">
                  <p className="font-medium text-gray-800">Rs {booking.price}</p>
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Title 
            title="Monthly Revenue" 
            subTitle="Revenue for current month"
          />
          <p className="mt-4 text-5xl font-bold text-blue-600">
            Rs {data.monthlyRevenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
