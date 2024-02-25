'use client'
import { LinkSchema } from '@/app/api/db/schema/links';
import { LinksArray } from './DashBoardPage/DashBoard';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRightSquare, CopyIcon, CopyCheck, LucideTrash2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";


import { useState, useEffect } from "react";


import { deleteObject } from '@/app/actions';
import EditExistingLinkDialog from './DashBoardPage/EditExistingLinkDialog';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function ExistingNormalLinkCard({ link, onDelete, links}: { link: LinkSchema, links:LinksArray, onDelete: (link : LinkSchema) => void}) {
    const [bgColor, setBgColor] = useState('');
    const [bgColor2, setBgColor2] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [newLink, setNewLink] = useState<LinkSchema>({
        ...link,
    });
    useEffect(() => {
        const fetchColor = async () => {
            if(newLink.thumbnailUrl !== '') {
                const encodedUrl = encodeURIComponent(link.thumbnailUrl);
                const res = await fetch(`/api/get-image-color?url=${encodedUrl}`);
                const json = await res.json();
                setBgColor(json?.color);
                setBgColor2(json?.saturatedColor);
            }
            else if(newLink.faviconURL !== undefined && newLink.faviconURL !== '') {
                const encodedUrl = encodeURIComponent(link.faviconURL);
                const res = await fetch(`/api/get-image-color?url=${encodedUrl}`);
                const json = await res.json();
                setBgColor(json.color);
            }
        };
        fetchColor();
    },[]);

    const handleCopy = () => {
        navigator.clipboard.writeText(link.url);
        setIsCopied(true);
        setTimeout(()=>setIsCopied(false), 2000);
    }
    async function handleDelete() {
        if(link.thumbnailUrl.startsWith('https://r2.my-links.live/')) {
            await deleteObject(link.thumbnailUrl);
        }
        const response = await axios.delete(`/api/db/deleteLink`,
            {
                params : link,
            }
        );
        onDelete(link)
        if(response.data.success) {
            toast(`Deleted Successfully`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
              });
        }        
    }
    return(
        // grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-1 items-center
            <Card className = {`mt-4 w-full grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3`} style={{background:`linear-gradient(${bgColor}, ${bgColor2})`}} >
                    <CardContent className='m-4 p-0 pt-0.5 h-[96px] w-[145px] grid grid-cols-1 items-center'>
                        {newLink.thumbnailUrl && newLink.thumbnailUrl !== '' ? 
                            <img src={newLink.thumbnailUrl} alt={newLink.title} className="rounded-lg max-h-[95px] max-w-[143px]"/> :
                            newLink.faviconURL && newLink.faviconURL !== '' &&
                            <img src={newLink.faviconURL} alt={newLink.title} className="rounded-lg max-h-[50px] max-w-[50px]"/>
                        }
                    </CardContent>
                    <CardHeader>
                        <CardTitle className='font-medium'>{newLink.title}</CardTitle>                
                    </CardHeader>
                {/* <div className='flex flex-col justify-center align-middle w-fit lg:pt-[10vh]'> */}
                <CardFooter className='p-3 m-0 mr-4 grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 items-center'>
                    <Button>
                        <Link href={link.url} target="blank">
                            <ArrowUpRightSquare/>
                        </Link>
                    </Button>
                    <Button onClick={handleCopy}>
                        {isCopied ? <CopyCheck/> : <CopyIcon />}
                    </Button>
                    {/* EditExistingLinkDialog is a trigger button */}
                    <EditExistingLinkDialog newLink={newLink} setNewLink={setNewLink} oldLink={link}/> 
                    <Button onClick={handleDelete}>
                        <LucideTrash2/>
                    </Button>
                </CardFooter>
                {/* </div> */}
            </Card>
    )
}