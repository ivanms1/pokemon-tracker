import React from "react";
import Link from "next/link";

import { useGetNuzlockesQuery } from "@/generated/generated";

import { GAMES } from "src/const";

function Home() {
  const { data } = useGetNuzlockesQuery();

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <h1 className="text-4xl text-black font-semibold mb-2">Nuzlockes</h1>
      {data?.nuzlockes?.map((nuzlocke) => (
        <Link href={`/nuzlocke/${nuzlocke?.id}`} key={nuzlocke?.id}>
          <a>
            <p>{nuzlocke?.title}</p>
            <p>{GAMES?.[nuzlocke?.gameId]?.label}</p>
          </a>
        </Link>
      ))}
    </div>
  );
}

export default Home;
