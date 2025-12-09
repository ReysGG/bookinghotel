import CheckoutDetail from "@/components/CheckoutDetail";
import { getReservationById } from "@/lib/data";
import { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Checkout"
}

const CheckOutPage = async ({ params }: { params: Promise<{ checkoutID: string }> }) => {
  const checkoutID = (await params).checkoutID
  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20 mt-12">
      <h1 className="text-2xl font-semibold mb-8">Reservation Summary</h1>
      <Suspense>
        <CheckoutDetail reservationId={checkoutID}></CheckoutDetail>
      </Suspense>
      <Script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} strategy="lazyOnload"></Script>
    </div>
  );
};

export default CheckOutPage;