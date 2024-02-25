"use client";
import DashBoard from "@/components/DashBoardPage/DashBoard";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
// import { Skeleton } from "@/components/ui/skeleton"
import { Player } from "@lottiefiles/react-lottie-player";
import Footer from '../../components/Footer';
export default function Home(){
    const { isLoaded, isSignedIn, user } = useUser();

    if(!isLoaded){
        return(
            <>
            <Navbar/>
            <main className="min-h-screen">                
                <div className="flex flex-col items-center justify-center">                
                <Player
                    autoplay
                    loop
                    src="https://lottie.host/d0b55f9b-ef82-435e-bae7-e1f66ce2b05e/jjuvcSm502.json"
                    style={{ height: '70vw', width: '70vw' }}
                />
                </div>                 
            </main>
            <Footer/>
            </>
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