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

import { ArrowUpRightSquare, CopyIcon, CopyCheck, LucideTrash2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";


import { useState, useEffect } from "react";

import { EditLinkDialog } from './DashBoardPage/EditLinkDialog';
import { deleteObject } from '@/app/actions';

export default function NormalLinkCard({ link, onDelete, links}: { link: LinkSchema, links:LinksArray, onDelete: (url: string) => void}) {
    const [bgColor, setBgColor] = useState('');
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
                setBgColor(json.color);
            }
            else if(newLink.faviconURL !== undefined && newLink.faviconURL !== '') {
                const encodedUrl = encodeURIComponent(link.faviconURL);
                const res = await fetch(`/api/get-image-color?url=${encodedUrl}`);
                const json = await res.json();
                setBgColor(json?.color);
            }
        };
        fetchColor();
    },[]);

    const handleCopy = () => {
        navigator.clipboard.writeText(link.url);
        setIsCopied(true);
    }
    async function handleDelete() {
        if(link.thumbnailUrl.startsWith('https://r2.my-links.live/')) {
            await deleteObject(link.thumbnailUrl);
        }
        onDelete(link.url);
    }
    return(
        <Card className = {`mt-4 justify-between p-2 align-middle grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-1 items-center w-fit`} style={{backgroundColor:bgColor}}>
        <div>
            <CardHeader>
                <CardTitle>{newLink.title}</CardTitle>                
            </CardHeader>
            <CardContent className="flex justify-center align-middle">
                {newLink.thumbnailUrl && newLink.thumbnailUrl !== '' ? 
                    <img src={newLink.thumbnailUrl} alt={newLink.title} className="rounded-xl lg:max-h-[25vw] lg:max-w-[25vw] sm:max-h-[50vw] sm:max-w-[50vw] md:max-w-[25vw] md:max-h-[25vw]"/> :
                    newLink.faviconURL && newLink.faviconURL !== '' &&
                    <img src={newLink.faviconURL} alt={newLink.title}  className="rounded-xl max-h-[10vw] max-w-[10vw]"/>
                }
            </CardContent>
        </div>
        <div className='flex flex-col justify-center align-middle w-fit lg:pt-[10vh]'>
        <CardFooter className='grid grid-cols-2 gap-4'>
                    <Button>
                        <Link href={link.url} target="blank">
                            <ArrowUpRightSquare/>
                        </Link>
                    </Button>
                    <Button onClick={handleCopy}>
                        {isCopied ? <CopyCheck/> : <CopyIcon />}
                    </Button>
                    {/* EditLinkDialog is a trigger button */}
                    <EditLinkDialog newLink={newLink} setNewLink={setNewLink} oldLink={link}/> 
                    <Button onClick={handleDelete}>
                        <LucideTrash2/>
                    </Button>
                </CardFooter>
                </div>
            </Card>
    )
}