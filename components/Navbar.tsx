import DarkModeSwitch from './DarkModeSwitch';
import Image from 'next/image';
import Link from "next/link";
import { Button } from './ui/button';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { SignInModal, ButtonType } from './SignInModal';


export default function Navbar(){
    return(
        <header className="sm:p-5 lg:px-6 min-h-16 flex items-center backdrop-blur-md backdrop-saturate-200 bg-opacity-75 bg-[#ababab68] dark:bg-[#222222af] rounded-xl m-4">
        <Link className="flex items-center justify-center" href="/">
          <Image src={'/logo.svg'} height={35} width={35} alt='my links live logo' className='m-2'/>
          <span className="sr-only">MyLinksLive</span>
        </Link>
        <nav className="flex gap-4 sm:gap-1 ml-auto sm:max-w-[98vw]">

          <Button variant={'link'} >
            <Link href="/pricing">
              Pricing
            </Link>
          </Button>

          {/* <Button variant={'link'} >
            <Link href="#">
              About
            </Link>
          </Button> */}

            <SignedIn>
              <UserButton/>
            </SignedIn>
            <SignedOut>
              <SignInModal title="Sign In" ButtonType={ButtonType.SignIn}/>
            </SignedOut>

          <DarkModeSwitch/>
        </nav>
      </header>
    )
}