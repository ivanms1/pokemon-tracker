import { Draggable, Droppable } from "react-beautiful-dnd";

import Box from "@/components/Box";
import PokemonImage from "@/components/PokemonImage";

import useStore from "src/store/store";

import { Pokemon } from "@/generated/generated";

interface Section {
  section: {
    id: string;
    label: string;
  };
  pokemons: Pokemon[];
}

function Section({ pokemons, section }: Section) {
  const setSelectedPokemon = useStore((store) => store.setSelectedPokemon);

  return (
    <Box className="w-3/12">
      <Droppable droppableId={section.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <p className="uppercase tracking-wider">{section.label}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center">
              {pokemons.map((pokemon, index) => (
                <Draggable
                  key={pokemon?.id}
                  draggableId={pokemon?.id}
                  index={index}
                >
                  {(provided) => (
                    <span
                      ref={provided.innerRef}
                      onClick={() => setSelectedPokemon(pokemon)}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PokemonImage
                        pokemonId={pokemon.pokemonId}
                        height="75"
                        width="75"
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

export default Section;
