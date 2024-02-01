import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const computeSHA256 = async (file: File) => {
	const buffer = await file.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
	  .map((b) => b.toString(16).padStart(2, "0"))
	  .join("");
	return hashHex;
};

export function extractObjectKeyFromUrl(url: string): string {
	if (!url) return '';
	const urlObj = new URL(url);
	const pathParts = urlObj.pathname.split('/');
	return pathParts[pathParts.length - 1];
}