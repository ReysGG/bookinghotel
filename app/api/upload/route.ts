import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";


export const PUT = async (request: Request) => {
    const form = await request.formData()
    const file = form.get('file') as File //ngambil nama "file" dari kiriman

    if(file.size == 0 || file.size == undefined){
        return NextResponse.json({message: "Field dibutuhkan"}, {status: 400})
    }
    if(file.size > 4000000 ){
        return NextResponse.json({message: "File must be least than 4MB"}, {status: 400})
    }
    if(!file.type.startsWith("image/")){
        return NextResponse.json({message: "File must be an image"}, {status: 400})
    }

    const blob = await put(file.name, file, {
        access: "public",
        multipart: true
    })

    return NextResponse.json(blob); 
}

export const DELETE = async (request: Request) => {
    const {searchParams} = new URL(request.url)
    const imageURL = searchParams.get("imageURL") as string;
    await del(imageURL);
    return NextResponse.json({status:200}); 
} 