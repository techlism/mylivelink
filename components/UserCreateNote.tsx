import { Info } from "lucide-react";

export default function UserCreateNote() {
  return (
    <div className="lg:max-w-[34vw] sm:max-w-[80vw] md:max-w-[45vww] p-5 bg-accent rounded-lg opacity-70 mb-4">
         <Info className="my-2"/>
      <p>If this is your first time adding links, you need to click on &apos;Edit Profile&apos; and personalize your background and heading. Then proceed to add links.</p>
    </div>
  );
}