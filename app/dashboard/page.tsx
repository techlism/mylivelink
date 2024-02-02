"use client";
import DashBoard from "@/components/DashBoardPage/DashBoard";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton"

import Footer from '../../components/Footer';
export default function Home(){
    const { isLoaded, isSignedIn, user } = useUser();
    if(!isLoaded){
        return(
            <main className="min-h-screen">
                <Navbar/>
                <div className="flex flex-col items-center justify-center">                
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[50vh] w-[35vw] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-[250px]" />
                        <Skeleton className="h-5 w-[200px]" />
                    </div>
                    </div>
                </div>  
                <Footer/>
            </main>
        )
    }
    else if(!isSignedIn){
        return(            
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Navbar/>
                <h1 className="text-3xl font-semibold">You are not signed in</h1>
                <Footer/>
            </div>
            
        )
    }
    else return(
        <>
            <Navbar/>
            <main className="min-h-screen grid grid-cols-1 items-center w-[100vw]">
                <DashBoard/>
                <ToastContainer />
            </main>
            <Footer/>
        </>

        
        
    )
}