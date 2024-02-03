import { NextRequest, NextResponse } from 'next/server';
import dbExecute from "../dbExecute";


export async function DELETE(req : NextRequest) {
    const link = Object.fromEntries(req.nextUrl.searchParams);
    if(link){
        try {
            const res = await dbExecute(`DELETE FROM Links WHERE username = ? AND url = ?`, [link.username, link.url]);
            if(res.rowsAffected > 0) return NextResponse.json({"success" : "link deleted"});
            else return NextResponse.json({"failure" : "Unable to Delete link"});
        }
        catch (error) {
            return NextResponse.json({"error" : error});
        }            
    }
    else return NextResponse.json({"error" : "Invalid data format"});   
}
