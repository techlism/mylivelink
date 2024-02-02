import dbExecute from "../dbExecute";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    const username = req.nextUrl.searchParams.get('username');
    if(!username) return NextResponse.json({"error" : "No user found"})
    try {
        const result = await dbExecute(
            `SELECT * FROM Links WHERE username = ?`,
            [username]
        );
        if(result.rows.length > 0 ) return NextResponse.json({"success" : result.rows});
        else return NextResponse.json({"failure" : "No links present. Please add some links" })
    } catch (error) {
        return NextResponse.json({"error":error})
    }
}