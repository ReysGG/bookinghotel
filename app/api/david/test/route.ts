import { NextResponse } from "next/server";


export const GET = async () => {
    return NextResponse.json({ message: 'Halo! Ini adalah API David Test.' });
}

export const POST = async (request: Request) => {
    try {
        const data = await request.json()
        const { nama, email } = data

        if(!nama) return NextResponse.json({message: "Nama di perlukan"}, {status: 400})
        if(!email) return NextResponse.json({message: "Email di perlukan"}, {status: 400})
        return NextResponse.json({message: "Pesan berhasil"}, {status:200})
    
    } catch (error) {
        console.log(error)
    }
}