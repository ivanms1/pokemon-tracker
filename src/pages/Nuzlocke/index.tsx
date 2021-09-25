import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";

import AddNewPokemonModal from "./AddNewPokemonModal";
import Team from "./Team";
import Section from "./Section";

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

  const onDragEnd: OnDragEndResponder = async (result) => {
    const { draggableId, destination } = result;

    if (!draggableId || !destination) {
      return;
    }

    console.log(`destination`, destination);
    console.log(`draggableId`, draggableId);
  };

  return (
    <div>
      <div>
        <p>{nuzlocke?.title}</p>
        <p>{GAMES[nuzlocke.gameId].label}</p>
      </div>
      <div className="flex w-full mb-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Team team={inTeam} />
          <Section pokemons={inPc} section={{ id: "IN_PC", label: "PC" }} />
          <Section pokemons={dead} section={{ id: "DEAD", label: "Dead" }} />
          <Section pokemons={seen} section={{ id: "SEEN", label: "Seen" }} />
        </DragDropContext>
      </div>
      <AddNewPokemonModal nuzlockeId={nuzlocke.id} gameId={nuzlocke?.gameId} />
    </div>
  );
}

export default Nuzlocke;
