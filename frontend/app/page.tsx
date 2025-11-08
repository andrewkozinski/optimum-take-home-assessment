"use client";
import Image from "next/image";
import TrendingMoviesContainer from "@/components/ui/trending-movies-container";
import { Navbar } from "@/components/ui/navbar";

export default function Home() {

  return (
    <div className="flex min-h-screen">
      <main className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="m-auto">
          <p>Home page</p>
          <TrendingMoviesContainer />
        </div>
      </main>
    </div>
  );
}
