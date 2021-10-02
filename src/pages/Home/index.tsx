import React from "react";
import Link from "next/link";

import { useGetNuzlockesQuery } from "@/generated/generated";

import { GAMES } from "src/const";
import Box from "@/components/Box";

function Home() {
  const { data } = useGetNuzlockesQuery();
  return (
    <div className="flex flex-col items-center h-full justify-center">
      <h1 className="text-4xl text-black font-semibold mb-10">Nuzlockes</h1>
      <div className="grid col-span-2 grid-cols-4 gap-5">
        {data?.nuzlockes?.map((nuzlocke) => (
          <Link href={`/nuzlocke/${nuzlocke?.id}`} key={nuzlocke?.id}>
            <a>
              <Box>
                <p>{nuzlocke?.title}</p>
                <p>{GAMES?.[nuzlocke?.gameId]?.label}</p>
              </Box>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
