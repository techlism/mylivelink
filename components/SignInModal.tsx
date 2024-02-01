import { Button, buttonVariants } from "./ui/button"
import { SignIn, SignUp } from '@clerk/nextjs';
import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "./ui/dialog"

export enum ButtonType {
  SignIn = "Sign In",
  SignUp = "Sign Up"
}





export function SignInModal({title,ButtonType}:{title:React.ReactNode, ButtonType:ButtonType}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>{title}</Button>
      </DialogTrigger>
      <DialogContent  className="rounded-xl">
        {ButtonType === "Sign In" ? <SignIn afterSignInUrl={"/dashboard"}/> : <SignUp afterSignUpUrl={"/dashboard"}/>}        
      </DialogContent>
    </Dialog>
  )
}
