import { Draggable, Droppable } from "react-beautiful-dnd";

import Box from "@/components/Box";
import PokemonImage from "@/components/PokemonImage";

import useStore from "src/store/store";

import { Pokemon } from "@/generated/generated";

import styles from "./Team.module.scss";

interface Team {
  team: Pokemon[];
}

function Team({ team }: Team) {
  const setSelectedPokemon = useStore((store) => store.setSelectedPokemon);

  return (
    <Box className={styles.Team}>
      <Droppable droppableId="IN_TEAM">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <p className={styles.Label}>Team</p>
            <div className={styles.Pokemons}>
              {team.map((pokemon, index) => (
                <Draggable
                  key={pokemon?.id}
                  draggableId={pokemon?.id}
                  index={index}
                >
                  {(provided) => (
                    <span
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => setSelectedPokemon(pokemon)}
                    >
                      <PokemonImage
                        artwork
                        height="100"
                        width="100"
                        pokemonId={pokemon?.pokemonId}
                      />
                    </span>
                  )}
                </Draggable>
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
  );
}

export default Team;
