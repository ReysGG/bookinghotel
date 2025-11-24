
import HeaderSection from "@/components/HeaderSection";
import Main, { MainSkeleton } from "@/components/Main";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Rooms & Rates - Hotel Ahoi",
    description: "Room dengan kualitas ahoi"
}


const RoomPage = () => {
  return (
    <div>
      <HeaderSection title="Rooms & Rates" description="Room dengan kualitas ahoi"></HeaderSection>
      <div className="mt-10 px-4">
        <Suspense fallback={MainSkeleton()}>
            <Main></Main>
        </Suspense>
      </div>
    </div>
  );
};

export default RoomPage;