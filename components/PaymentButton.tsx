"use client";

import { startTransition, useTransition } from "react";
import { ReservationType } from "@/types/reservation";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}

const PaymentButton = ({ reservation }: { reservation: ReservationType }) => {
  const [isPending, StartTransition] = useTransition();
  const handlepayment = async () => {
    StartTransition(async () => {
      try {
        const response = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(reservation),
        });
        const { token, message } = await response.json();
        if (token) {
          window.snap.pay(token);
        }
        if (message) {
          alert(message);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <button
      className="px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-blue-600 rounded-sm hover:bg-blue-500 cursor-pointer"
      onClick={handlepayment}
    >
      {isPending ? "Loading..." : "Process Payment"}
    </button>
  );
};

export default PaymentButton;
