import getPixels from "get-pixels"

import { extractColors } from 'extract-colors'

import { NextRequest, NextResponse } from 'next/server'

const getPixelsPromise = (url : string) => {
    return new Promise((resolve, reject) => {
      getPixels(url, (err, pixels) => {
        if (err) {
          reject(err);
        } else {
          resolve(pixels);
        }
      });
    });
};

export async function GET(req : NextRequest) {
    const url = req.nextUrl.searchParams.get('url');
    if(!url){
        return NextResponse.json({"error" : "No url found"})
    }
    try {
        const pixels: any = await getPixelsPromise(url);
        const data = Array.from(pixels.data as number[]);
        const width = Math.round(Math.sqrt(data.length / 4));
        const height = width;
        const colors = await extractColors({ data, width, height });
        const minSaturatedColor = colors.reduce((min, color) => 
            color.saturation < min.saturation ? color : min, colors[0]
        );        
        const colorWithAlpha = `${minSaturatedColor.hex}59`;
        return NextResponse.json({"color" : colorWithAlpha});
    } catch (error) {
        return NextResponse.json({"error" : error});
    }
}    