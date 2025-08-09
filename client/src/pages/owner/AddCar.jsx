import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";

const AddCar = () => {
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    const { name, value, type } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: type === "number" ? Number(value) || "" : value,
    }));
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Submitting Car Data:", car);
    console.log("Submitting Image:", image);
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <div className="max-w-4xl mx-auto">
        <Title
          title="Add New Car"
          subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
        />
        <form onSubmit={onSubmitHandler} className="mt-8 space-y-6">
          <div className="flex items-center gap-6">
            <label htmlFor="image-upload" className="cursor-pointer">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Car Preview"
                  className="w-32 h-32 object-cover rounded-lg shadow-sm"
                />
              ) : (
                <img 
                  src={assets.upload_icon} 
                  alt="Upload" 
                  className="h-14 rounded cursor-pointer hover:opacity-70 transition-opacity"
                />
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              hidden
            />
            <p className="text-gray-600">Upload a picture of your car</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={car.brand}
                onChange={onChangeHandler}
                placeholder="e.g. BMW, Mercedes, Audi..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                Model
              </label>
              <input
                type="text"
                name="model"
                id="model"
                value={car.model}
                onChange={onChangeHandler}
                placeholder="e.g. X5, E-Class, M4..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                id="year"
                value={car.year}
                onChange={onChangeHandler}
                placeholder="2025"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="pricePerDay" className="form-label">
                Daily Price (Rs)
              </label>
              <input
                type="number"
                name="pricePerDay"
                id="pricePerDay"
                value={car.pricePerDay}
                onChange={onChangeHandler}
                placeholder="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={car.category}
                onChange={onChangeHandler}
                placeholder="Sedan"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-2">
                Transmission
              </label>
              <input
                type="text"
                name="transmission"
                id="transmission"
                value={car.transmission}
                onChange={onChangeHandler}
                placeholder="Automatic"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type
              </label>
              <input
                type="text"
                name="fuel_type"
                id="fuel_type"
                value={car.fuel_type}
                onChange={onChangeHandler}
                placeholder="Diesel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="seating_capacity" className="block text-sm font-medium text-gray-700 mb-2">
                Seating Capacity
              </label>
              <input
                type="number"
                name="seating_capacity"
                id="seating_capacity"
                value={car.seating_capacity}
                onChange={onChangeHandler}
                placeholder="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={car.location}
              onChange={onChangeHandler}
              placeholder="e.g. Mumbai, Delhi, Bangalore..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={car.description}
              onChange={onChangeHandler}
              rows="4"
              placeholder="Describe your car, its condition, and any notable details..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              required
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <img 
                src={assets.tick_icon} 
                alt="Add" 
                className="w-5 h-5"
              />
              List Your Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
