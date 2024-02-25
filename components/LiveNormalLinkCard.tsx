"use client";
import { LinkSchema } from "@/app/api/db/schema/links";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowUpRightSquare, CopyIcon, CopyCheck } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

import { useState, useEffect } from "react";

export default function LiveNormalLinkCard({ link }: { link: LinkSchema }) {
  const [bgColor, setBgColor] = useState("");
  const [bgColor2, setBgColor2] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    const fetchColor = async () => {
      if (link.thumbnailUrl !== "") {
        const encodedUrl = encodeURIComponent(link.thumbnailUrl);
        const res = await fetch(`/api/get-image-color?url=${encodedUrl}`);
        const json = await res.json();
        setBgColor(json.color);
        setBgColor2(json?.saturatedColor);
      } else if (link.faviconURL !== undefined && link.faviconURL !== "") {
        const encodedUrl = encodeURIComponent(link.faviconURL);
        const res = await fetch(`/api/get-image-color?url=${encodedUrl}`);
        const json = await res.json();
        setBgColor(json?.color);
        setBgColor2(json?.saturatedColor);
      }
    };
    fetchColor();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(link.url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  console.log(bgColor, bgColor2);
  return (
    <Link href={link.url} target="blank">
    <Card className = {`mt-4 w-full grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 hover:opacity-90`} style={{background:`linear-gradient(${bgColor}, ${bgColor2})`}} >
            <CardContent className='m-4 p-0 pt-0.5 h-[96px] w-[145px] grid grid-cols-1 items-center sticky top-0'>
                {link.thumbnailUrl && link.thumbnailUrl !== '' ? 
                    <img src={link.thumbnailUrl} alt={link.title} className="rounded-lg max-h-[95px] max-w-[143px]"/> :
                    link.faviconURL && link.faviconURL !== '' &&
                    <img src={link.faviconURL} alt={link.title} className="rounded-lg max-h-[50px] max-w-[50px]"/>
                }
            </CardContent>
            <CardHeader>
                <CardTitle className='font-medium'>{link.title}</CardTitle>                
            </CardHeader>
          <CardFooter className='p-3 m-0 mr-4 grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 items-center'>
            {/* <Button className="hover:scale-105">
              <Link href={link.url} target="blank">
                <ArrowUpRightSquare />
              </Link>
            </Button> */}
            <Button onClick={handleCopy} className="hover:scale-105">
              {isCopied ? <CopyCheck /> : <CopyIcon />}
            </Button>
          </CardFooter>
    </Card>
    </Link>
  );
}
