import { Button } from "../ui/button"
import * as React from "react"
import { SignedIn, SignedOut} from '@clerk/nextjs';
import { ButtonType } from "../SignInModal";
import Link from "next/link"
import { SignInModal } from '../SignInModal';
export default function HeroSection(){
    return(
        <section className="flex flex-col gap-4 align-middle justify-center text-center min-h-[80vh]">
            <div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
                MyLinksLive - Connect Your Content
                </h1>
            </div>
              <div>
                <p className="text-base">
                MyLinksLive helps you build a customizable landing page for your social media profiles, turning
                  followers into customers.
                </p>
              </div>
              <div className="flex gap-4 justify-center">            
                {/* <Button variant={'outline'} className="p-3 rounded-lg bg-background text-base"> */}
                <SignedOut>
                  <Button>
                      <Link href="https://accounts.my-links.live/sign-up">
                        Get Started
                      </Link>                    
                    </Button>
                </SignedOut>                
                <SignedIn>
                  <Button>
                    <Link href="/dashboard">
                      Go to Dashboard
                    </Link>                    
                  </Button>
                </SignedIn>
                {/* <Button variant={'outline'} className="bg-transparent">
                  <Link href={'#'}>
                    Learn More
                  </Link>
                </Button>                 */}
              </div>
        </section>
    )
}