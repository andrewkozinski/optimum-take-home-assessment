"use client";
import Image from "next/image";
import TrendingMovies from "@/components/ui/trending-movies-list";

export default function Home() {

  return (
    <div className="flex min-h-screen">
      <main className="flex min-h-screen w-full">

        <div className="m-auto">
          <p>Home page</p>
          <TrendingMovies />
        </div>

      </main>
    </div>
  );
}
