import { User } from "../schema/users";
import dbExecute from "../dbExecute";
import { NextRequest, NextResponse } from "next/server";

// async function bodyParser(bodyData: ReadableStream<Uint8Array>) {
//   const reader = bodyData.getReader();
//   let result: Uint8Array[] = [];
//   return reader.read().then(function processText({ done, value }): any {
//     if (done) {
//       return JSON.parse(result.toString());
//     }
//     result.push(value);
//     return reader.read().then(processText);
//   });
// }

export async function POST(req: NextRequest) {
  const { user } = await req.json();
  // console.log(user);
  if (user) {
    try {
      const res = await dbExecute(
        `INSERT INTO Users (username, heading, background, userProfileURL ) VALUES (?, ?, ?, ?)`,
        [user.username, user.heading, user.background, user.userProfileURL]
      );
      // console.log(res);
      if (res.rowsAffected > 0)
        return NextResponse.json({ success: "user created" });
      else return NextResponse.json({ failure: "unable to create user" });
    } catch (error) {
      // console.log(error)
      return NextResponse.json({ error: error });
    }
  } else {
    return NextResponse.json({ error: "No user data given" });
  }
}
// else return NextResponse.json({"error" : "no body"});

// }
