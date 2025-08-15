import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const AddCar = () => {

  const {axios, currency} = useAppContext();

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

  const [isLoading, setIsLoading] = useState(false);
  const onSubmitHandler = async(e) => {
    e.preventDefault();
    if(isLoading) {
       return null;
    }
    
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      const {data} = await axios.post("/api/owner/add-car", formData);
      if(data.success) {
        toast.success("Car added successfully!");
        setImage(null);
        setCar({
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
      } else {
        toast.error(data.message || "Failed to add car.");
      }
    } catch (error) {
      toast.error("Failed to add car.");
    } finally {
      setIsLoading(false);
    }
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
              <select
                name="transmission"
                id="transmission"
                value={car.transmission}
                onChange={onChangeHandler}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="" disabled>Select transmission type</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="CVT">CVT (Continuously Variable)</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            <div>
              <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type
              </label>
              <select
                name="fuel_type"
                id="fuel_type"
                value={car.fuel_type}
                onChange={onChangeHandler}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="" disabled>Select fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG (Compressed Natural Gas)</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="LPG">LPG (Liquefied Petroleum Gas)</option>
              </select>
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
              {isLoading ? "Adding..." : "List Your Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
