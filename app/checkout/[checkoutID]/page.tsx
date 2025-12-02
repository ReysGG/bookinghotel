import CheckoutDetail from "@/components/CheckoutDetail";
import { getReservationById } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout"
}

const CheckOutPage = async ({params} : {params: Promise<{checkoutID: string}>}) => {
    const checkoutID = (await params).checkoutID
  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20 mt-12">
      <h1 className="text-2xl font-semibold mb-8">Reservation Summary</h1>
      <CheckoutDetail reservationId={checkoutID}></CheckoutDetail>
    </div>
  );
};

export default CheckOutPage;