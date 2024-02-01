import { NextRequest, NextResponse } from 'next/server';
import dbExecute from "../dbExecute";
import { LinkSchema } from "../schema/links";

async function bodyParser(bodyData : ReadableStream<Uint8Array>){
    const reader = bodyData.getReader();
    let result = {};
    return reader.read().then(function processText({ done, value }): any {
      if (done) {
        return result;
      }
      result = JSON.parse(value.toString());
      return reader.read().then(processText);
    })
}

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
