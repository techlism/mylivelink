import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req : NextRequest) {
    const url = req.nextUrl.searchParams.get('url');
    if(!url){
        return NextResponse.json({"error" : "No url found"})
    }
    try {
        // const url = decodeURIComponent(req.query.url as string);
        const fetchedURL = await fetch(url);
        const html = await fetchedURL.text();
        const $ = cheerio.load(html);
        let image =  $('meta[property="og:image"]').attr('content') || $('meta[property="twitter:image"]').attr('content');

        if (image && !image.startsWith('http')) {
            const urlObj = new URL(url);
            image = urlObj.origin + image;
        }
        
        let faviconUrl = $('link[rel="shortcut icon"]').attr('href') ||
                                            $('link[rel="icon"]').attr('href') ||
                                            '/favicon.ico';
    
        if (faviconUrl && !faviconUrl.startsWith('http')) {
            const urlObj = new URL(url);
            faviconUrl = urlObj.origin + faviconUrl;
        }

        if(faviconUrl && image) {
            return NextResponse.json({"image" : image , "favicon" : faviconUrl});
        }
        if(faviconUrl && !image){
            return NextResponse.json({"favicon":faviconUrl});
        }
        if(!faviconUrl && image){
            return NextResponse.json({"image" : image});
        }
        if(!faviconUrl && !image){
            return NextResponse.json({'error': 'No image or favicon found'});
        }
        else{
            return NextResponse.json({"error" : "Unable to fetch favicon/image"})
        }
    } catch (error) {
        return NextResponse.json({"error" : error})
    }

}