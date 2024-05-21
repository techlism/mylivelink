
import { LinkSchema } from "@/app/api/db/schema/links";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CopyIcon, CopyCheck } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

import ShareDropdownMenu from "./ShareDropdown";

export default function LiveNormalLinkCard({ link, bgColor1, bgColor2 }: { link: LinkSchema, bgColor1 : string, bgColor2 : string }) {
  return (
    <Link 
      href={link.url}
      target="_blank"
    >
      <div
        className={`mt-3 rounded-sm rounded-l-0 ${
          bgColor1 === 'primary' ? 'bg-gradient-to-b from-slate-600 to-zinc-900' : ''
        } flex flex-row justify-stretch h-20 items-center align-middle transform transition-transform duration-200 ease-in-out hover:scale-105`}
        style={{
          background: bgColor1 !== 'primary' ? `linear-gradient(to bottom, ${bgColor2}, ${bgColor1})` : '',
        }}
      >
        <div
          className={`w-[36%] h-full flex ${
            link.thumbnailUrl !== '' ? 'justify-center' : 'justify-start'
          } items-center overflow-hidden rounded-l-sm`}
        >
          {link.thumbnailUrl !== '' ? (
            <img src={link.thumbnailUrl} alt={link.title} className="object-cover h-full w-full" />
          ) : (
          <img src={link.faviconURL} alt={link.title} 
            className="object-cover h-full max-w-full"
            style={{ clipPath: 'inset(4% 4% 4% 4%)' }} />
          )}
        </div>

        <div className="flex-1 px-4">
          <h2 className="font-medium text-lg">{link.title}</h2>
        </div>
        <ShareDropdownMenu link={link.url}/>
    </div>
    </Link>       
  );
}
