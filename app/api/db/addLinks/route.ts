"use server";
import { LinkSchema, LinkType } from "../schema/links";
import dbExecute from "../dbExecute";
import { NextRequest, NextResponse } from "next/server";

async function bodyParser(bodyData: ReadableStream<Uint8Array>) {
  const reader = bodyData.getReader();
  let result = {};
  return reader.read().then(function processText({ done, value }): any {
    if (done) {
      return result;
    }
    result = JSON.parse(value.toString());
    return reader.read().then(processText);
  });
}

export async function POST(req: NextRequest) {
  const data = req.body;
  if (data) {
    const { links }: { links: LinkSchema[]} = await bodyParser(data);
    if (links) {
      try {
        let res = [];
        for (let link of links) {
		  if(link.type === LinkType.Existing){
			res.push(0);
			continue;
		  }
		  if(link.username === undefined) return NextResponse.json({"failure" : "No username present. Please re-add the link, after deleting it from the dashboard"});
          link.type = LinkType.Existing;
          const result = await dbExecute(
            `INSERT INTO links (title, url, thumbnailUrl, type, faviconURL, category, username) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              link.title,
              link.url,
              link.thumbnailUrl,
              link.type,
              link.faviconURL,
              link.category,
              link.username
            ]
          );		
          res.push(result.rowsAffected);
        }
        if (res.length > 0 && res.length == links.length)
          return NextResponse.json({ success: "All Links Added" });
        else if (res.length > 0 && res.length < links.length)
          return NextResponse.json({ partial_insertion: res });
        else return NextResponse.json({ failure: "unable to add links" });
      } catch (error) {
        // console.log(error);
        return NextResponse.json({ error: error });
      }
    } else return NextResponse.json({ error: "Could not parse Links" });
  } else {
    return NextResponse.json({ error: "no data in body" });
  }
}
