"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { backgrounds } from "./DashBoard";
import axios from "axios";
import { User } from "@/app/api/db/schema/users";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { X } from "lucide-react";

export default function EditUserDetailDialog({
  setUserDetails,
  userDetails,
}: {
  setUserDetails: React.Dispatch<React.SetStateAction<any>>;
  userDetails: User;
}) {
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState(userDetails.heading);
  const [background, setBackground] = useState(backgrounds[0]);
  const { user } = useUser();
  useEffect(()=>{
	  setBackground(backgrounds.find(bg => bg.url === userDetails.background)!);
  },[userDetails])

  const handleUserDetailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setUserDetails({
      username: user?.username!,
      heading: heading,
      background: background.url,
      userProfileURL: user?.imageUrl!,
    });
    const check = await axios.get(`/api/db/checkUserExist?username=${user?.username}`);
    // console.log(check);
    if (!check.data.error) {
      if (check.data.false) {
        const createUser = await axios.post("/api/db/createUser", userDetails);
        // console.log(createUser);
      }
      if (check.data.true) {
        await axios.post("/api/db/modifyUser", { "user": userDetails });
      }
    } else{
		toast(check.data.error, {
			position: 'bottom-right',
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
			theme: 'dark'
		  })
	}
	setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mx-4 mb-4">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[250px] md:max-w-[450px] lg:max-w-[550px]">
	  <DialogClose>
			<X className="h-4 w-4" />			
		</DialogClose>
        <DialogHeader>
          <DialogTitle>Edit your Profile</DialogTitle>
          <DialogDescription>
            To update your username or profile picture, please click on the
            profile badge in the navigation bar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUserDetailSubmit} className="flex flex-col gap-4" id="user-detail-form">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="heading" className="text-right">
              Heading
            </Label>
            <Input
              className="overflow-scroll w-full p-2"
              id="heading"
              type="text"
              defaultValue={userDetails.heading.toString()}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="background" className="text-right">
              Background
            </Label>
            <select
              defaultValue={background.name}
			  onChange={(e) => {
				const selectedBackground = backgrounds.find(bg => bg.name === e.target.value);
				if (selectedBackground) {
				  setBackground(selectedBackground);
				}
			  }}
              className="bg-background p-3 border rounded-lg font-medium text-sm"
			  id="background"
            >
              {backgrounds.map((bg) => (
                <option key={bg.name} value={bg.name}>
                  {bg.name}
                </option>
              ))}
            </select>
          </div>
		        <img
              src={background.url}
              alt={background.name}
              className="rounded-lg border my-4 mx-2"
            />
        </form>
		<DialogFooter>
		<Button type="submit" className="mr-4" form="user-detail-form">
              Save Profile Details
		</Button>
		</DialogFooter>
      </DialogContent>
	  
    </Dialog>
  );
}
