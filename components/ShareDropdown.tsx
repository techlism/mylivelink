"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { ClipboardCopy, ShareIcon } from "lucide-react";

export default function ShareDropdownMenu({link} : {link : string}){
    const handleDropdownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    };
    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              url: link
            });
          } catch (error : any) {
            console.error('Error sharing content: ', error);
          }
        }
      };
    return(
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <button className="bg-transparent hover:bg-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 rounded-md text-primary m-4 ease-in-out" onClick={handleDropdownClick}>
            <EllipsisVertical/>
        </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuLabel>Share Link</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <Button className="flex justify-between border-0 gap-5 text-gray-700 dark:text-gray-200 text-sm" variant={'outline'} onClick={() =>  navigator.clipboard.writeText(link)}>
                Copy <ClipboardCopy opacity={70} size={16}/>
            </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Button className="flex justify-between border-0 gap-5 text-gray-700 dark:text-gray-200 text-sm" variant={'outline'} onClick={handleShare}>
                Share <ShareIcon opacity={70} size={16}/>
            </Button>
        </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    )
}

function EllipsisVertical(){
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-ellipsis-vertical"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    );
}
  