import { useState } from "react";
import { useRouter } from "next/router";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { Button } from "@mantine/core";

import AddNewPokemonModal from "./AddNewPokemonModal";
import Team from "./Team";
import Section from "./Section";
import SelectedPokemonModal from "./SelectedPokemonModal";

import { GAMES } from "src/const";

import {
  useGetNuzlockeQuery,
  useUpdatePokemonStatusMutation,
} from "@/generated/generated";

import styles from "./Nuzlocke.module.scss";

function Nuzlocke() {
  const [isAddPokemonOpen, setIsAddPokemonOpen] = useState(false);
  const [updateStatus] = useUpdatePokemonStatusMutation();

  const router = useRouter();

  const { id } = router.query;

  const { data } = useGetNuzlockeQuery({
    variables: {
      id: String(id),
    },
  });

  const onDragEnd: OnDragEndResponder = async (result) => {
    const { draggableId, destination }: any = result;

    if (!draggableId || !destination) {
      return;
    }

    const pokemonToUpdate = nuzlocke.pokemons.find((p) => p.id === draggableId);

    if (pokemonToUpdate?.status === destination.droppableId) {
      return;
    }

    if (pokemonToUpdate) {
      await updateStatus({
        variables: {
          id: draggableId,
          status: destination?.droppableId,
        },
        optimisticResponse: {
          updatePokemonStatus: {
            ...pokemonToUpdate,
            status: destination?.droppableId,
          },
        },
      });
    }
  };

  if (!data) {
    return <p>Error</p>;
  }

  const { nuzlocke } = data;

  const inTeam = nuzlocke?.pokemons.filter((p) => p.status === "IN_TEAM") ?? [];
  const inPc = nuzlocke?.pokemons.filter((p) => p.status === "IN_PC") ?? [];
  const dead = nuzlocke?.pokemons.filter((p) => p.status === "DEAD") ?? [];
  const seen = nuzlocke?.pokemons.filter((p) => p.status === "SEEN") ?? [];

  return (
    <div className={styles.Nuzlocke}>
      <div className={styles.Header}>
        <p className={styles.Title}>{nuzlocke?.title}</p>
        <p className={styles.Game}>{GAMES[nuzlocke?.gameId].label}</p>
      </div>
      <div className={styles.Sections}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Team team={inTeam} />
          <Section pokemons={inPc} section={{ id: "IN_PC", label: "PC" }} />
          <Section pokemons={dead} section={{ id: "DEAD", label: "Dead" }} />
          <Section pokemons={seen} section={{ id: "SEEN", label: "Seen" }} />
        </DragDropContext>
      </div>

      <Button type="button" size="xl" onClick={() => setIsAddPokemonOpen(true)}>
        Add Pokemon
      </Button>
      <AddNewPokemonModal
        nuzlockeId={nuzlocke.id}
        gameId={nuzlocke?.gameId}
        isOpen={isAddPokemonOpen}
        onClose={() => setIsAddPokemonOpen(false)}
      />
      <SelectedPokemonModal />
    </div>
  );
}

export default Nuzlocke;
