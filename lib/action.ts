"use server"

import { error } from "console"
import { ContactFormSchema, RoomSchema } from "./zod"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

//wajib pake async kerena ada hubungan ama database / api
//prevState berguna untuk menerima state sebelumnya dari useActionState, karna useActionState nilainya null. Bisa di pake untuk mengirim data lama
export const ContactMessage = async (prevState: unknown, formData: FormData) => {
    const ValidateFields = ContactFormSchema.safeParse(Object.fromEntries(formData.entries()))
    // jadi, ContactFormSchema mengambil data dari formData, lalu di parse ke object pake Object.fromEntries
    //lalu di validasi pake safeParse, kalo validasi gagal, dia ga bakal lempar error, tapi ngembaliin object dengan properti success false dan error
    //kalo validasi berhasil, dia ngembaliin object dengan properti success true dan data

    if (!ValidateFields.success) {
        return { error: ValidateFields.error.flatten().fieldErrors } //mengembalikan object dengan properti error yang berisi fieldErrors dari zod
    }

    const { name, email, subject, message } = ValidateFields.data

    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message
            }
        });
        return {
            message: "Thank you for contacting us. We will get back to you shortly.",
        }
    } catch (error) {
        console.log("Error creating contact message:", error)
    }
}

export const saveRoom = async (image: string, NilaiAwal: unknown, formData: FormData) => {
    
    if (!image) return { message: "image is Required" }

    const rawData = {
        name: formData.get('name'),
        description: formData.get('description'),
        capacity: formData.get('capacity'),
        price: formData.get('price'),
        amenities: formData.getAll('amenities')
    };

    const ValidateFields = RoomSchema.safeParse(rawData)
    
    if (!ValidateFields.success) return { error: ValidateFields.error.flatten().fieldErrors }

    const { name, description, capacity, price, amenities } = ValidateFields.data
    

    try {
        await prisma.room.create({
            data: {
                name,
                description,
                image,
                price,
                capacity,
                RoomAmenities: {
                    createMany: {
                        data: amenities.map((item) => ({
                            amenitiesId: item
                        }))
                    }
                }
            }
        })
        
    } catch (error) {
        console.log(error)
    }

    redirect("/admin/room/");

} 