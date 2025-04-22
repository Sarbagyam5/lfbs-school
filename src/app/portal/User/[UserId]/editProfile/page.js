"use client";
import EditProfileForm from "@/components/EditProfileForm";
import { getUserById } from "@/utils/axios/axios";
import React, { useEffect, useState } from "react";

function editProfile({ params }) {
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
  return (
    <div>
      <EditProfileForm user={user} id={UserId} />
    </div>
  );
}

export default editProfile;
