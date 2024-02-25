"use client"
import DarkModeSwitch from './DarkModeSwitch';
import Image from 'next/image';
import Link from "next/link";
import { Button } from './ui/button';
import { UserButton, SignedIn, SignedOut, RedirectToSignIn, SignIn } from '@clerk/nextjs';
import { useState } from 'react';

export default function Navbar(){
  const [signInState , setSignInState] = useState<React.JSX.Element>(<text>Sign In</text>);
  const handleSignIn = () => {
    setSignInState(<RedirectToSignIn/>);
  }
    return(
        <header className="sm:p-5 lg:px-6 min-h-16 flex items-center backdrop-blur-md backdrop-saturate-200 bg-opacity-75 bg-[#ababab68] dark:bg-[#222222af] rounded-xl m-4">
        <Link className="flex items-center justify-center" href="/">
          <Image src={'/logo.svg'} height={35} width={35} alt='my links live logo' className='m-2 dark:invert'/>
          <span className="sr-only">MyLinksLive</span>
        </Link>
        <nav className="flex gap-4 sm:gap-1 ml-auto sm:max-w-[98vw]">

          <Button variant={'link'} >
            <Link href="/pricing">
              Pricing
            </Link>
          </Button>
            <SignedIn>
              <UserButton/>
            </SignedIn>
            <SignedOut>
              <Button onClick={handleSignIn}>
                {signInState}
              </Button>              
            </SignedOut>
          <DarkModeSwitch/>
        </nav>
      </header>
    )
}