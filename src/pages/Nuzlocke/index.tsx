import { useState } from "react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";

import AddNewPokemonModal from "./AddNewPokemonModal";
import Team from "./Team";
import Section from "./Section";
import Button from "@/components/Button";

import { GAMES } from "src/const";

import {
  Nuzlocke as NuzlockeProps,
  useUpdatePokemonStatusMutation,
} from "@/generated/generated";

interface Nuzlocke {
  nuzlocke: NuzlockeProps;
}

function Nuzlocke({ nuzlocke }: Nuzlocke) {
  const [isAddPokemonOpen, setIsAddPokemonOpen] = useState(false);
  const [updateStatus] = useUpdatePokemonStatusMutation();

  const onDragEnd: OnDragEndResponder = async (result) => {
    const { draggableId, destination }: any = result;

    if (!draggableId || !destination) {
      return;
    }

    await updateStatus({
      variables: {
        id: draggableId,
        status: destination?.droppableId,
      },
    });
  };

  const inTeam = nuzlocke?.pokemons.filter((p) => p.status === "IN_TEAM") ?? [];
  const inPc = nuzlocke?.pokemons.filter((p) => p.status === "IN_PC") ?? [];
  const dead = nuzlocke?.pokemons.filter((p) => p.status === "DEAD") ?? [];
  const seen = nuzlocke?.pokemons.filter((p) => p.status === "SEEN") ?? [];

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
      <Button type="button" onClick={() => setIsAddPokemonOpen(true)}>
        Add Pokemon
      </Button>
      <AddNewPokemonModal
        nuzlockeId={nuzlocke.id}
        gameId={nuzlocke?.gameId}
        isOpen={isAddPokemonOpen}
        onClose={() => setIsAddPokemonOpen(false)}
      />
    </div>
  );
}

export default Nuzlocke;
