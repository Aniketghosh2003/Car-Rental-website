import React, { useState, useEffect } from "react";
import Title from "../../components/owner/Title";
import { assets, dummyMyBookingsData } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageBookings = () => {

  const { axios , currency} = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || "Failed to fetch bookings.");
      }
    } catch (error) {
      toast.error("Failed to fetch bookings.");
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', { bookingId, status });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message || "Failed to update booking status.");
      }
    } catch (error) {
      toast.error("Failed to update booking status.");
    }
  };


  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses"
      />

      <div className="w-full overflow-x-auto mt-6">
        <div className="min-w-max border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Car
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Range
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={booking.car.image}
                        alt={`${booking.car.brand} ${booking.car.model}`}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <p className="font-medium text-gray-900">
                        {booking.car.brand} {booking.car.model}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(booking.pickupDate)} To{" "}
                    {formatDate(booking.returnDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    Rs {booking.price}
                  </td>
                  <td className='p-3'>
                    {booking.status === 'pending' ? (
                        <select 
                          value={booking.status} 
                          onChange={(e) => changeBookingStatus(booking._id, e.target.value)}
                          className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none'
                        >
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="confirmed">Confirmed</option>
                        </select>
                    ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                            {booking.status}
                        </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
