"use server"

import { error } from "console"
import { ContactFormSchema } from "./zod"
import { prisma } from "@/lib/prisma"

export const ContactMessage = async (prevState: unknown,formData: FormData) => {
    const ValidateFields = ContactFormSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!ValidateFields.success) {
        return {error: ValidateFields.error.flatten().fieldErrors}
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
        return {message : "Thank you for contacting us. We will get back to you shortly."}
    } catch (error) {
        console.log("Error creating contact message:", error)
    }
}