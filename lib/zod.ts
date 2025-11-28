import { array, coerce, number, object, string } from "zod";

export const RoomSchema = object({
    name: string().min(1),
    description: string().min(50),
    capacity: coerce.number().gt(0),
    price: coerce.number().gt(0),
    amenities: array(string()).nonempty()
})

export const ReserveSchema = object({
    name: string().min(1),
    phone: string().min(10),
})

export const ContactFormSchema = object({
    name: string().min(6, "Name must be at least 6 characters long"), // semacam validasi
    email: string().min(6, "Email must be at least 6 characters long").email("Please enter valid email"), // semacam validasi
    subject: string().min(6, "Subject must be at least 6 characters long"),
    message: string().min(10, "Message must be at least 10 characters long").max(500, "Message must be at most 500 characters long"),
})

