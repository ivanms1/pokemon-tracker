import React from "react";
import Link from "next/link";
import { Button } from "@mantine/core";

import Box from "@/components/Box";
import PokemonImage from "@/components/PokemonImage";

import { useGetNuzlockesQuery } from "@/generated/generated";

import { GAMES } from "src/const";

import styles from "./User.module.scss";

function User() {
  const { data } = useGetNuzlockesQuery();

  return (
    <div className={styles.User}>
      <h1 className={styles.Title}>Nuzlockes</h1>
      <Link href="/new-nuzlocke" passHref>
        <Button component="a" size="lg" className={styles.AddNewButton}>
          Add New
        </Button>
      </Link>

      <div className={styles.Nuzlockes}>
        {data?.nuzlockes?.map((nuzlocke) => (
          <Link href={`/nuzlocke/${nuzlocke?.id}`} key={nuzlocke?.id}>
            <a className={styles.Nuzlocke}>
              <Box>
                <p className={styles.NuzlockeTitle}>{nuzlocke?.title}</p>
                <p>{GAMES?.[nuzlocke?.gameId]?.label}</p>
                <div>
                  {nuzlocke?.pokemons
                    ?.filter((p) => p.status === "IN_TEAM")
                    .map((p) => (
                      <PokemonImage
                        key={p.id}
                        pokemonId={p.pokemonId}
                        width="72"
                        height="72"
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

export default User;
