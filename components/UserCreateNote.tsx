import { Info } from "lucide-react";

export default function UserCreateNote() {
  return (
    <div className="p-4 bg-accent rounded-lg opacity-70 mb-4 w-full">
      <Info className="my-2"/>
      <p>If this is your first time adding links, you need to click on &apos;Edit Profile&apos; and personalize your background and heading. Then proceed to add links.</p>
    </div>
  );
}