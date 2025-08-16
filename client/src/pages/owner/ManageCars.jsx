import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageCars = () => {

  const { isOwner, axios, currency } = useAppContext();
  const [cars, setCars] = React.useState([]);

  const fetchOwnerCars = async () => {
    try {
      const {data} = await axios.get("/api/owner/cars");
      if(data.success) {
        setCars(data.cars);
      }else{
        toast.error(data.message || "Failed to fetch cars.");
      }
    } catch (error) {
      toast.error("Failed to fetch cars."); 
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-cars", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this car?"
      );
      if (!confirm) return null;

      const { data } = await axios.post("/api/owner/delete-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  const getStatusClass = (isAvailable) => {
    return isAvailable
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
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
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cars.map((car) => (
                <tr key={car._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {car.brand} {car.model}
                        </p>
                        <p className="text-xs text-gray-500">
                          {car.seating_capacity} seats • {car.transmission}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {car.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Rs {car.pricePerDay}/day
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                        car.isAvaliable
                      )}`}
                    >
                      {car.isAvaliable ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className='flex items-center p-3'>
                    <img onClick={() => toggleAvailability(car._id)} src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="" className='cursor-pointer'/>
                    <img onClick={() => deleteCar(car._id)} src={assets.delete_icon} alt="" className='cursor-pointer'/>
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

export default ManageCars;
