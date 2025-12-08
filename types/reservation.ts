import { Prisma } from "@/lib/generated/prisma";


export type ReservationType = Prisma.ReservationGetPayload<{
    include: {
        Room: {
            select: {
                name : true,
                image: true,
                price: true,
            }
        }
        User: {
            select: {
                name: true,
                email: true,
                phone: true,
            }
        }
        Payment: true
    }
}>