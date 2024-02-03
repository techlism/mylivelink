"use server"
import dbExecute from "../dbExecute";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    // console.log(req.nextUrl.searchParams);
    const oldUsername = req.nextUrl.searchParams.get('oldUsername');
    const newUsername = req.nextUrl.searchParams.get('newUsername');
    // console.log(oldUsername, newUsername);
    if(!oldUsername && !newUsername) return NextResponse.json({"error" : "No user found in url"})
    if(newUsername === oldUsername) return NextResponse.json({"error" : "New username cannot be same as old username"})
    try {
        const linksResult = await dbExecute(`SELECT * FROM Links WHERE username = ?`, [oldUsername]);
        // console.log(linksResult);
        if (linksResult.rows.length > 0) {
            // Delete all links associated with the old username
            await dbExecute(`DELETE FROM Links WHERE username = ?`, [oldUsername]);
        
            // Re-insert the links with the new username
            for (const link of linksResult.rows) {
                await dbExecute(`INSERT INTO Links (username, title, url, thumbnailUrl, type, faviconURL, category) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [newUsername, link.title, link.url, link.thumbnailUrl, link.type, link.faviconURL, link.category]);
            }
        
            return NextResponse.json({"success" : "Links updated with new username"});
        }
        else return NextResponse.json({"failure" : "No links present. Please add some links" })
    } catch (error) {
        return NextResponse.json({"error":error})
    }
}