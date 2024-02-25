'use client'
import axios from 'axios';
import LandingPage from '../components/LandingPage/LandingPage';
import Navbar from '../components/Navbar';
import { useUser } from "@clerk/nextjs";
import { backgrounds } from '@/components/DashBoardPage/DashBoard';
import { toast } from "react-toastify";
import { User } from "@/app/api/db/schema/users";
import { useState, useEffect } from 'react';
export default function Home() {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<User>({
    username: "",
    heading: "A custom message for your visitors",
    background: backgrounds[0].url,
    userProfileURL: "",
  });
  async function getUserDetails() {
    if (userDetails.username === user?.username) return;
    if(user?.username === undefined) return;
    const check = await axios.get(
      `/api/db/checkUserExist?username=${user?.username}`
    );

    if (check.data.true && user?.username && user?.imageUrl) {
      const details: User = check.data.true;
      setUserDetails(details);
      return;
    } else if (check.data.false) {
      const toSend : User = JSON.parse(JSON.stringify(userDetails));
      toSend.username = user?.username!;
      toSend.userProfileURL = user?.imageUrl!;
      const create = await axios.post("/api/db/createUser", {"user" : toSend});
      if (create.data.success) getUserDetails();
    }
  }

  useEffect(() => {
    async function updateUserDynamically() {
      if (
        userDetails.username !== "" &&
        user?.username !== undefined &&
        user?.imageUrl !== undefined
      ) {
        // console.log(user);
        if (
          user?.username !== userDetails.username ||
          user.imageUrl !== userDetails.userProfileURL
        ) {
          const currDetails: User = JSON.parse(JSON.stringify(userDetails));
          const newDetails: User = JSON.parse(JSON.stringify(userDetails));
          newDetails.username = user?.username!;
          newDetails.userProfileURL = user?.imageUrl;
        //   console.log(newDetails);

          const check = await axios.get(
            `/api/db/checkUserExist?username=${currDetails.username}`
          );
          if (check.data.true) {
            // If the user has just updated profile picture
            if (newDetails.username === currDetails.username) {
              // console.log(newDetails)
              const modify = await axios.post("/api/db/modifyUser", { "user": newDetails });
              if(modify.data.success) {
                setUserDetails(newDetails);
              }
              return;
            }

            if (newDetails?.username !== currDetails.username) {
              const update = await axios.get(
                `/api/db/modifyLinksUsername?oldUsername=${currDetails.username}&newUsername=${newDetails.username}`
              );
            //   console.log(update);
              if (update.data.success) {
                const deleteUser = await axios.delete(`/api/db/deleteUser`, {
                  params: { username: currDetails.username },
                });
                if (deleteUser.data.success) {
                  toast(
                    `Username associated with ${currDetails.username} migrated to ${userDetails.username}`,
                    {
                      position: "bottom-right",
                      autoClose: 3000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: "dark",
                    }
                  );
                }
              }
            }
          }
        }
      }
    }
    getUserDetails().then(updateUserDynamically);
  }, [user?.username, user?.imageUrl, user]);  
  return (
    <>
      <Navbar/>
      <LandingPage/>
    </>
  );
}
