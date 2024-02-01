"use server"

import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";


import crypto from "crypto"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { extractObjectKeyFromUrl } from "@/lib/utils";

export type SignedURLResponse = Promise <
  { failure?: undefined; success: { url: string } } | { failure: string; success?: undefined }
>;

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  }
});

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
]

const maxFileSize = 1024 * 1024 * 0.5; // 500KB

type GetSignedURLParams = {
  fileType: string
  fileSize: number
  checksum: string
  username: string | undefined
}

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

export async function getSignedURL(
  {
    fileType,
    fileSize,
    checksum,
    username
  }: GetSignedURLParams
): Promise<SignedURLResponse> {
  if (!username) {
    return { failure: "not authenticated" }
  }
  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" }
  }
  if (fileSize > maxFileSize) {
    return { failure: "File size too large. Please upload images under 500Kb" }
  }
  const key = generateFileName();    
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    Metadata:{
      userName : username
    }    
  });

  const url = await getSignedUrl(S3, putObjectCommand, { expiresIn: 3600 });

  return {success: {url} }
}


export async function deleteObject(url : string): Promise<void> {
  const key = extractObjectKeyFromUrl(url);
  try {
    if(key){
      const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: key,
      });
      await S3.send(deleteObjectCommand);
    }
  } catch (error) {
    console.log(error);
  }
}
