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

export async function POST(req : NextRequest) {
    const data = req.body;
    if(data){
        const {link} : {link : LinkSchema} = await bodyParser(data);
        if(link){
            try {
                const res = await dbExecute(`UPDATE Links SET title = ?, url = ?, thumbnailUrl = ?, type = ?, faviconURL = ?, category = ? WHERE username = ?`, 
                [link.title, link.url, link.thumbnailUrl, link.type, link.faviconURL, link.category, link.username]);
                if(res.rowsAffected > 0) return NextResponse.json({"success" : "link updated"});
                else return NextResponse.json({"failure" : "unable to modify link"});
            }
            catch (error) {
                return NextResponse.json({"error" : error});
            }            
        }
        else return NextResponse.json({"error" : "invalid data"});
    }
    else return NextResponse.json({"error" : "no data in body"});
}
