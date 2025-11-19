import { Prisma } from "@/lib/generated/prisma";

export type RoomProps = Prisma.RoomGetPayload<{
    // Ini sama persis dengan query yang Anda pakai di 'findUnique'
    include: {
        RoomAmenities: { select: { amenitiesId: true } }
    }
}>