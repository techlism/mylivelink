"use client";
import { LinkSchema } from "@/app/api/db/schema/links";
import {
  Card,
  CardContent,
  CardDescription,
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
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    const fetchColor = async () => {
      if (link.thumbnailUrl !== "") {
        const encodedUrl = encodeURIComponent(link.thumbnailUrl);
        const res = await fetch(`/api/get-image-color?url=${encodedUrl}`);
        const json = await res.json();
        setBgColor(json.color);
      } else if (link.faviconURL !== undefined && link.faviconURL !== "") {
        const encodedUrl = encodeURIComponent(link.faviconURL);
        const res = await fetch(`/api/get-image-color?url=${encodedUrl}`);
        const json = await res.json();
        setBgColor(json?.color);
      }
    };
    fetchColor();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(link.url);
    setIsCopied(true);
  };

  return (
    <Card
      className={`mt-4 justify-between p-2 align-middle grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-5 items-center w-fit hover:opacity-80`}
      style={{ backgroundColor: bgColor }}
    >
      <div>
        <CardHeader>
          <CardTitle>{link.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center align-middle">
          {link.thumbnailUrl && link.thumbnailUrl !== "" ? (
            <img
              src={link.thumbnailUrl}
              alt={link.title}
              className="rounded-xl lg:max-h-[25vw] lg:max-w-[25vw] sm:max-h-[50vw] sm:max-w-[50vw] md:max-w-[25vw] md:max-h-[25vw]"
            />
          ) : (
            link.faviconURL &&
            link.faviconURL !== "" && (
              <img
                src={link.faviconURL}
                alt={link.title}
                className="rounded-xl max-h-[10vw] max-w-[10vw]"
              />
            )
          )}
        </CardContent>
      </div>
      <div className="flex flex-col justify-center align-middle w-fit lg:pt-[10vh]">
        <CardFooter className="grid grid-cols-2 gap-4">
          <Button className="hover:scale-105">
            <Link href={link.url} target="blank">
              <ArrowUpRightSquare />
            </Link>
          </Button>
          <Button onClick={handleCopy} className="hover:scale-105">
            {isCopied ? <CopyCheck /> : <CopyIcon />}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
