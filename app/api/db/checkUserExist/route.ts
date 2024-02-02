'use server'
import { NextRequest, NextResponse } from "next/server";
import dbExecute from "../dbExecute";



export async function GET(req : NextRequest) {
    const username = req.nextUrl.searchParams.get('username');
    if(username){
        try {
            const result = await dbExecute(
                `SELECT * FROM Users WHERE username = ?`,
                [username]
            );
            if(result.rows.length > 0 ) return NextResponse.json({"true" : result.rows[0]});
            else return NextResponse.json({"false" : "User does not exist" })              
        } catch (error) {
            return NextResponse.json({"error":error})
        }          
    }
    else return NextResponse.json({"error" : "No username in url"});
}

