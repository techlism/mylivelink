"use client";
import DashBoard from "@/components/DashBoardPage/DashBoard";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/LandingPage/Navbar";
import { ToastContainer } from "react-toastify";
export default function Home(){
    const { isLoaded, isSignedIn, user } = useUser();
    const email = user?.emailAddresses[0]?.emailAddress
    return(
        <>
            <Navbar/>
            <DashBoard/>
            <ToastContainer />
        </>
        
    )
}