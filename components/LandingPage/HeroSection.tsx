"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import * as React from "react"
import { SignedIn, SignedOut, RedirectToSignUp} from '@clerk/nextjs';

import Link from "next/link"
import { TypewriterEffectSmooth } from '../ui/type-writer';
const headingWords = [
  {
    text: "MyLinksLive",
    // className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    text: "-",
  },
  {
    text: "Connect",
  },
  {
    text: "Your",
  },
  {
    text: "Content",
  },
]

export default function HeroSection(){
    const [signInState , setSignInState] = useState<React.JSX.Element>(<text>Get Started</text>);
    const handleSignIn = () => {
      setSignInState(<RedirectToSignUp/>);
    }  
    return(
        <section className="flex flex-col gap-4 align-middle justify-center text-center min-h-[80vh]">
            <div className="grid grid-cols-1 place-items-center">
                {/* <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
                MyLinksLive - Connect Your Content
                </h1> */}
                <TypewriterEffectSmooth words={headingWords} />
            </div>
              <div>
                <p className="text-lg">
                  MyLinksLive helps you build a customizable landing page for your social media profiles, turning
                  followers into customers.
                </p>
              </div>
              <div className="flex gap-4 justify-center">            
                {/* <Button variant={'outline'} className="p-3 rounded-lg bg-background text-base"> */}
                <SignedOut>
                  <Button onClick={handleSignIn}>
                    {signInState}
                </Button>
                </SignedOut>                
                <SignedIn>
                  <Button>
                    <Link href="/dashboard">
                      Go to Dashboard
                    </Link>                    
                  </Button>
                </SignedIn>
              </div>

        </section>
    )
}