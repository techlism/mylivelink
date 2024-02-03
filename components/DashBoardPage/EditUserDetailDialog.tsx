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
import { Loader2Icon, X } from "lucide-react";

export default function EditUserDetailDialog({
  setUserDetails,
  userDetails,
}: {
  setUserDetails: React.Dispatch<React.SetStateAction<any>>;
  userDetails: User;
}) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const [saving, setSaving] = useState(false);
  const handleUserDetailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    const check = await axios.get(
      `/api/db/checkUserExist?username=${user?.username}`
    );
    if (!check.data.error) {
      if (check.data.false) {
        await axios.post("/api/db/createUser", {"user" : userDetails});
      }
      if (check.data.true) {
        await axios.post("/api/db/modifyUser", { "user": userDetails });
      }
    } else {
      toast(check.data.error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      setSaving(false);
    }
    setSaving(false);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mx-4 mb-4">
          Edit Profile
        </Button>
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
        <form
          onSubmit={handleUserDetailSubmit}
          className="flex flex-col gap-4"
          id="user-detail-form"
        >
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="heading" className="text-right">
              Heading
            </Label>
            <Input
              className="overflow-scroll w-full p-2"
              id="heading"
              type="text"
              defaultValue={userDetails.heading}
              onChange={(e) =>
                setUserDetails((prev: User) => ({
                  ...prev,
                  heading: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="background" className="text-right">
              Background
            </Label>
            <select
              value={userDetails.background}
              onChange={(e) => {
                const selectedBackground = backgrounds.find(
                  (bg) => bg.url === e.target.value
                );
                if (selectedBackground) {
                  setUserDetails((prev: User) => ({
                    ...prev,
                    background: selectedBackground.url,
                  }));
                }
              }}
              className="bg-background p-3 border rounded-lg font-medium text-sm"
              id="background"
            >
              {backgrounds.map((bg) => (
                <option key={bg.url} value={bg.url}>
                  {bg.name}
                </option>
              ))}
            </select>
          </div>
          <img
            src={userDetails.background}
            alt={userDetails.username + " background picture"}
            className="rounded-lg border my-4 mx-2"
          />
        </form>
        <Button
          type="submit"
          className="mr-5"
          form="user-detail-form"
          disabled={saving}
        >
          {saving ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Save Profile Details"
          )}
        </Button>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
