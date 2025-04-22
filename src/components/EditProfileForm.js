"use client";
import { compressImageToUnder100KB } from "@/helper/compressImage";
import { updateUserById } from "@/utils/axios/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiUpload } from "react-icons/fi";

function EditProfileForm({ user, id }) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [address, setAddress] = useState(user?.address || "");
  const [image, setImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleImageChange = async (e) => {
    const file = e.target?.files[0];
    if (!file) return;
    try {
      const compressedFile = await compressImageToUnder100KB(file);
      const imageUrl = URL.createObjectURL(compressedFile);
      setSelectedImageUrl(imageUrl);
      setImage(compressedFile);
      if (file) {
        setSelectedFileName(file.name);
      }
    } catch (error) {
      console.error("cannot compress file");
    }
  };

  async function submitForm(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("mobile", mobile);
    formData.append("phone", phone);
    formData.append("email", email);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      await toast.promise(updateUserById(id, formData), {
        loading: "Uploading...",
        success: <b>Uploaded Succesfully!</b>,
        error: <b>Could not upload.</b>,
      });
      setLoading(false);
      router.push(`/portal/User/${id}`);
    } catch (error) {
      console.error("Error while updating profile:", error);
    }
  }

  return (
    <>
      <Toaster />
      <form onSubmit={submitForm} className="flex flex-col items-center">
        <h1 className="font-semibold mb-10 text-3xl">Edit Profile</h1>
        <div className="pt-5 flex items-center w-full justify-between">
          <div>
            <label className="font-semibold text-gray-700">
              Profile Picture
            </label>
            <div className="w-full">
              <div className="relative">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <label
                  htmlFor="image"
                  className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition-colors duration-200 inline-block"
                >
                  Choose Image
                </label>

                {selectedFileName && (
                  <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                    {selectedFileName}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            {selectedImageUrl || user.profilePictureUrl ? (
              <Image
                className="rounded-full"
                src={selectedImageUrl || user.profilePictureUrl}
                height={100}
                width={100}
                alt="User Profile"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                <span className="text-gray-500 text-sm">No image</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-5 relative flex flex-col w-full ">
          <label
            htmlFor="name"
            className="absolute text-gray-700 font-semibold top-2 left-2 bg-white px-2"
          >
            Name
          </label>
          <input
            className="border w-auto text-gray-600 placeholder:text-gray-600 focus:outline-none border-gray-400 rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="pt-5 relative flex flex-col w-full ">
          <label
            htmlFor="Email"
            className="absolute text-gray-700 font-semibold top-2 left-2 bg-white px-2"
          >
            Email
          </label>
          <input
            className="border w-auto text-gray-600 placeholder:text-gray-600 focus:outline-none border-gray-400 rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-col md:flex-row md:gap-2 ">
          <div className="pt-5 relative flex flex-col">
            <label
              htmlFor="phone"
              className="absolute text-gray-700 font-semibold top-2 left-2 bg-white px-2"
            >
              Phone
            </label>
            <input
              className="border w-auto text-gray-600 placeholder:text-gray-600 focus:outline-none border-gray-400 rounded p-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="pt-5 md:w-1/2 relative flex flex-col">
            <label
              htmlFor="mobile"
              className="absolute text-gray-700 font-semibold top-2 left-2 bg-white px-2"
            >
              Mobile
            </label>
            <input
              className="border w-auto text-gray-600 placeholder:text-gray-600 focus:outline-none border-gray-400 rounded p-2"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-5 relative flex flex-col w-full ">
          <label
            htmlFor="address"
            className="absolute font-semibold text-gray-700 top-2 left-2 bg-white px-2"
          >
            Address
          </label>
          <input
            className="border w-auto text-gray-600 placeholder:text-gray-600 focus:outline-none border-gray-400 rounded p-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex mt-6 rounded text-white items-center bg-blue-600 p-2 px-4 cursor-pointer hover:bg-blue-700 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            "Updating..."
          ) : (
            <>
              <FiUpload className="mr-2" />
              Update
            </>
          )}
        </button>
      </form>
    </>
  );
}

export default EditProfileForm;
