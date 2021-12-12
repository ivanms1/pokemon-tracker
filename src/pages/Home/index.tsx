import React from "react";
import Link from "next/link";

import Button from "@/components/Button";
import Box from "@/components/Box";
import PokemonImage from "@/components/PokemonImage";

import { useGetNuzlockesQuery } from "@/generated/generated";

import { GAMES } from "src/const";

function Home() {
  const { data } = useGetNuzlockesQuery();
  return (
    <div className="flex flex-col h-full ">
      <h1 className="text-4xl text-black font-semibold mb-5">Nuzlockes</h1>
      <Button href="/new-nuzlocke" className="max-w-[150px] mb-10">
        Add New
      </Button>
      <div className="grid col-span-2 grid-cols-2 md:grid-cols-4 gap-5">
        {data?.nuzlockes?.map((nuzlocke) => (
          <Link href={`/nuzlocke/${nuzlocke?.id}`} key={nuzlocke?.id}>
            <a>
              <Box>
                <p>{nuzlocke?.title}</p>
                <p>{GAMES?.[nuzlocke?.gameId]?.label}</p>
                <div className="flex">
                  {nuzlocke?.pokemons
                    ?.filter((p) => p.status === "IN_TEAM")
                    .map((p) => (
                      <PokemonImage
                        key={p.id}
                        pokemonId={p.pokemonId}
                        width="50"
                        height="50"
                      />
                    ))}
                </div>
              </Box>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
