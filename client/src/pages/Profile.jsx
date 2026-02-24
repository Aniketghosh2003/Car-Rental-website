import React, { useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, axios, fetchUser, navigate } = useAppContext();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">Profile</h1>
        <p className="text-gray-600 mb-4">Please login to view and edit your profile.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dull transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post("/api/owner/update-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message || "Profile image updated");
        await fetchUser();
      } else {
        toast.error(data.message || "Failed to update image");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Failed to update image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const avatar = user.image || assets.user_profile;

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Mobile-only Back button */}
      <div className="sm:hidden mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <span className="text-lg leading-none">&#8592;</span>
          <span>Back</span>
        </button>
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h1>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center gap-6">
        <div className="relative">
          <img
            src={avatar}
            alt={user.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow-sm"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow hover:bg-primary-dull transition-colors"
          >
            <img src={assets.edit_icon} alt="Edit" className="w-4 h-4 invert" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {uploading && (
            <p className="mt-2 text-xs text-gray-500 text-center">Uploading...</p>
          )}
        </div>

        <div className="w-full space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Name</p>
            <p className="mt-1 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              {user.name}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Email</p>
            <p className="mt-1 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
