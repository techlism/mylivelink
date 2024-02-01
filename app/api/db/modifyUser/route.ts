import { User } from "../schema/users";
import dbExecute from "../dbExecute";
import { NextRequest, NextResponse } from "next/server";

async function bodyParser(bodyData : ReadableStream<Uint8Array>){
    const reader = bodyData.getReader();
    let result : User;
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
        const {user} : {user : User} = await bodyParser(data);
        if(user){
            try {
                const res = await dbExecute(`UPDATE users SET heading = ?, background = ? WHERE username = ?`, 
                    [user.heading, user.background, user.username]);
                if(res.rowsAffected > 0 ) return NextResponse.json({"success":"user details updated"});
                else return NextResponse.json({"failure" : "unable to update user"});
            } catch (error) {
                return NextResponse.json({"error":error});
            }            
        }
        else return NextResponse.json({"error" : "invalid user details"})
    }
    else return NextResponse.json({"error" : "no data in body"});
}