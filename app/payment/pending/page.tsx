import { Metadata } from "next";
import Link from "next/link";
import { HiClock } from "react-icons/hi";

export const metadata: Metadata = {
  title: "Payment pending",
  description: "Payment pending",
};

const PaymentPending = () => {
  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20 mt-12">
      <div className="p-6 md:mx-auto">
        <HiClock className="text-yellow-600 w-20 h-20 mx-auto my-6"></HiClock>
        <div className="text-center">
          <h3 className="md:text-2xl text-base font-semibold text-gray-900 text-center">
            Payment pending!
          </h3>
          <p className="text-gray-600 my-2">Your payment is pending.</p>
          <p>Have a great day!</p>
          <div className="py-10 text-center">
            <Link
              href={"/myreservation"}
              className="px-12 py-2 bg-blue-600 text-white rounded-full"
            >
              Go TO MY RESERVATION
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPending;
