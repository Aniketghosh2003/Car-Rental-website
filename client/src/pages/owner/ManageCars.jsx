import React, { useState, useEffect } from "react";
import { dummyCarData, assets } from "../../assets/assets";
import Title from "../../components/owner/Title";

const ManageCars = () => {
  const [cars, setCars] = React.useState([]);

  const fetchOwnerCars = async () => {
    setCars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

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
                    <img src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="" className='cursor-pointer'/>
                    <img src={assets.delete_icon} alt="" className='cursor-pointer'/>
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
