import AddNewPokemonModal from "./AddNewPokemonModal";

import { GAMES } from "src/const";

import type { Nuzlocke as NuzlockeProps } from "@/generated/generated";

interface Nuzlocke {
  nuzlocke: NuzlockeProps;
}

function Nuzlocke({ nuzlocke }: Nuzlocke) {
  const inTeam = nuzlocke.pokemons.filter((p) => p.status === "IN_TEAM");
  const inPc = nuzlocke.pokemons.filter((p) => p.status === "IN_PC");
  const dead = nuzlocke.pokemons.filter((p) => p.status === "DEAD");
  const seen = nuzlocke.pokemons.filter((p) => p.status === "SEEN");

  return (
    <div>
      <div>
        <p>{nuzlocke?.title}</p>
        <p>{GAMES[nuzlocke.gameId].label}</p>
      </div>
      <div>
        <div>
          <p>Team</p>
          <div>
            {inTeam.map((pokemon) => (
              <div key={pokemon.id}>
                <p>{pokemon.nickname}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p>In PC</p>
          <div>
            {inPc.map((pokemon) => (
              <div key={pokemon.id}>
                <p>{pokemon.nickname}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p>Dead</p>
          <div>
            {dead.map((pokemon) => (
              <div key={pokemon.id}>
                <p>{pokemon.nickname}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p>Seen</p>
          <div>
            {seen.map((pokemon) => (
              <div key={pokemon.id}>
                <p>{pokemon.nickname}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddNewPokemonModal nuzlockeId={nuzlocke.id} gameId={nuzlocke?.gameId} />
    </div>
  );
}

export default Nuzlocke;
