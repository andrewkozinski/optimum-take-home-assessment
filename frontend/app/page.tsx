"use client";
import Image from "next/image";
import TrendingMoviesContainer from "@/components/ui/trending-movies-container";

export default function Home() {

  return (
    <div className="flex min-h-screen">
      <main className="flex min-h-screen w-full">

        <div className="m-auto">
          <p>Home page</p>
          <TrendingMoviesContainer />
        </div>

      </main>
    </div>
  );
}
