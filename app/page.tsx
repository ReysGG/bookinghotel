
import FadeContent from "@/components/Animation/FadeContent";
import Main from "@/components/Main";
import Hero from "@/components/navbar/hero";

export default function Home() {
  return (
    <>
      <div>
        <Hero></Hero>
        <div className="mt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold uppercase">Room & Rate</h1>
            <p className="text-gray-500 py-3 ">Discover our luxurious rooms and exclusive rates</p>
          </div>
          <Main></Main>
        </div>
      </div>
    </>
  );
}
