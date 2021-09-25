import AddNewPokemonModal from "./AddNewPokemonModal";

import { GAMES } from "src/const";

import type { Nuzlocke as NuzlockeProps } from "@/generated/generated";
import Team from "./Team";
import Section from "./Section";

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
      <div className="flex w-full mb-5">
        <Team team={inTeam} />
        <Section pokemons={inPc} section={{ id: "inPc", label: "PC" }} />
        <Section pokemons={dead} section={{ id: "dead", label: "Dead" }} />
        <Section pokemons={seen} section={{ id: "seen", label: "Seen" }} />
      </div>
      <AddNewPokemonModal nuzlockeId={nuzlocke.id} gameId={nuzlocke?.gameId} />
    </div>
  );
}

export default Nuzlocke;
