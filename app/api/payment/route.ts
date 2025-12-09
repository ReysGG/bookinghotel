import { NextResponse } from "next/server";
import Midtrans from 'midtrans-client';
import { ReservationType } from "@/types/reservation";
import { se } from "date-fns/locale";
import { email } from "zod";
import { Phone } from "lucide-react";

const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
})

export const POST = async (request: Request) => {
    const reservation: ReservationType = await request.json()

    try {
        const parameter = {
            transaction_details: {
                order_id: reservation.id,
                gross_amount: reservation.Payment?.amount || 0,
            },
            credit_card: {
                secure: true
            },
            customer_details: {
                first_name: reservation.User.name,
                email: reservation.User.email,
            }
        }
        const token = await snap.createTransactionToken(parameter);
        return NextResponse.json({ token })
    } catch (error) {
        return NextResponse.json({ message: "Sudah dilakukan booking" }, { status: 500 })
    }
}