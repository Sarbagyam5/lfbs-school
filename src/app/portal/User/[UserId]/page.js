"use client";
import { getUserById } from "@/utils/axios/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

function UserById({ params }) {
  const router = useRouter();
  const { UserId } = React.use(params);
  const [user, setuser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(UserId);
        setuser(user);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [UserId]);

  const userDetail = [
    {
      key: "Name",
      value: user?.name,
    },
    {
      key: "Username",
      value: user?.username,
    },
    {
      key: "Mobile",
      value: user?.mobile,
    },
    {
      key: "Phone",
      value: user?.phone,
    },
    {
      key: "Email",
      value: user?.email,
    },
    {
      key: "Role",
      value: user?.role?.at(-1).toUpperCase(),
    },
    {
      key: "PAN",
      value: user?.pan,
    },
    {
      key: "Status",
      value: user?.status,
    },
    {
      key: "Created At",
      value: user?.createdAt,
    },
    {
      key: "Modified At",
      value: user?.modifiedAt,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="flex w-48 h-48 text-gray-700 rounded-full border-2 border-gray-300 text-3xl items-center justify-center ">
        {user ? (
          <Image
            className="rounded-full"
            src={user.profilePictureUrl}
            height={150}
            width={150}
            alt="User Profile"
          ></Image>
        ) : (
          <FaRegUser />
        )}
      </div>

      <div className="relative mt-10 sm:grid sm:grid-cols-2 gap-1  border-2 border-gray-400 p-1 pt-4 ">
        <div className=" text-lg -top-4 font-semibold   left-2 absolute px-4  justify-start bg-white">
          Profile Details:
        </div>
        {userDetail.map((detail, index) => {
          return (
            <div
              key={index}
              className="px-2 max-w-96 sm:border border-gray-300"
            >
              <span className="font-semibold">{detail.key}: </span>
              {detail?.value}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => router.push(`/portal/User/${UserId}/editProfile`)}
        className="flex items-center mt-5 mr-5 text-xl bg-blue-600 p-3 px-8 rounded text-white cursor-pointer hover:bg-blue-700"
      >
        <FaEdit />
      </button>
    </div>
  );
}

export default UserById;
