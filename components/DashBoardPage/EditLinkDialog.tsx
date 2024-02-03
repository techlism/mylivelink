"use client"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

import { Alert, AlertDescription } from "../ui/alert"

import React from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { useState } from "react"
import { deleteObject, getSignedURL } from "@/app/actions"
import { computeSHA256, extractObjectKeyFromUrl } from "@/lib/utils"
import { useUser } from '@clerk/nextjs';

import { X, Loader2Icon, LucideEdit } from "lucide-react"
import { LinkSchema } from '../../app/api/db/schema/links';


export function EditLinkDialog({ newLink, setNewLink, oldLink}: { newLink: LinkSchema, setNewLink: React.Dispatch<React.SetStateAction<LinkSchema>>, oldLink: LinkSchema}) {	
	
	const[open, setOpen] = useState(false);
	const[saving, setSaving] = useState(false);
	const {user} = useUser();
	const [fileStatus, setFileStatus] = useState('');
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { id, value } = e.target;
		setNewLink((prev : LinkSchema) => ({
			...prev,
			[id]: value
		}));
	}

	async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {		
		const file: File | undefined = e.target.files?.[0] || undefined;
		if (file && user && user.username) {
            if(newLink.thumbnailUrl !== '' && newLink.thumbnailUrl.startsWith('https://r2.my-links.live/')) {
                await deleteObject(newLink.thumbnailUrl);
            }
			setFileStatus("Uploading, please don't close the dialog...")
			const signedURLResult = await getSignedURL(
				{
					fileSize: file.size,
					fileType: file.type,
					checksum : await computeSHA256(file),
					username: user?.username,
				}				
			);
			if(signedURLResult.failure !== undefined) {
				setFileStatus(signedURLResult.failure);
				return;
			}

			const {url} = signedURLResult.success;

			await fetch(url, {
				method: "PUT",
				headers: {
				  "Content-Type": file.type,
				},
				body: file,
			}).then((response)=>{
				setNewLink((prev : LinkSchema) => ({
					...prev ,
					thumbnailUrl: "https://r2.my-links.live/"+extractObjectKeyFromUrl(response.url) 
				}));
			}).catch((error)=>{
				setFileStatus(`Upload Failed : ${error} . Please try again.`);
			}).finally(()=>{
				setFileStatus('Uploaded Successfully');
			})

		}
	}	
	async function handleCancel() {
			setFileStatus('');
            setOpen(false);
	}
	async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        // console.log(newLink);
		setSaving(true);
		e.preventDefault();
		if(newLink.url !== oldLink.url) {
			const encodedURL  = encodeURIComponent(newLink.url)
			const res = await fetch(`/api/opengraph?url=${encodedURL}`)
			const data = await res.json();
			if (data.error) {
				console.error(data.error);
				return;
			}
			  
			if (!newLink.thumbnailUrl && data.image) {
				newLink.thumbnailUrl = data.image;
			}
			  
			if (data.favicon) {
				newLink.faviconURL = data.favicon;
			}
		}
		setFileStatus('');
		setSaving(false);
		setOpen(false);
	}
	
	return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default"> <LucideEdit/> </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[250px] md:max-w-[450px] lg:max-w-[550px]">
		<DialogClose onClick={handleCancel}>
			<X className="h-4 w-4" />			
		</DialogClose>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            Modify the details
          </DialogDescription>
        </DialogHeader>
		{(fileStatus !== '') &&
			<Alert variant={(fileStatus === 'File type not allowed' || fileStatus === 'File size too large') ? 'destructive' : 'default'}>
				<AlertDescription>{fileStatus}</AlertDescription>
			</Alert>
		}
        <form className="grid gap-4 py-4" onSubmit={handleSave}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
             Title<span className="text-red-500 text-sm">*</span>
            </Label>
            <Input
              id="title"
              required
              className="col-span-3"
              value={newLink?.title}
              onChange={handleChange}
			  defaultValue={newLink?.title}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
                URL<span className="text-red-500 text-sm">*</span>
            </Label>
            <Input
              id="url"
              className="col-span-3"
			  type="url"
              required
              value={newLink?.url || ''}
              onChange={handleChange}
			  defaultValue={newLink?.url}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
			<Label htmlFor="file" className="text-right">
                Thumbnail<br/>
				<span className="text-gray-500 text-xs">(optional)</span>
            </Label>
            <Input
              id="thumbnailUrl"
              className="col-span-3"
              type="file"
              accept="image/*"
              onChange={handleFileChange}              
            />            
          </div>          
            <Separator/>
            <Button type="submit" disabled={saving}>{saving ? <Loader2Icon className="animate-spin"/> : 'Save Changes'}</Button>
        </form>
        <DialogFooter>          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
