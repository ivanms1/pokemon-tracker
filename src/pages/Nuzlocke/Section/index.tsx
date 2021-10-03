import { Draggable, Droppable } from "react-beautiful-dnd";

import Box from "@/components/Box";
import PokemonImage from "@/components/PokemonImage";

import { Pokemon } from "@/generated/generated";

interface Section {
  section: {
    id: string;
    label: string;
  };
  pokemons: Pokemon[];
}

function Section({ pokemons, section }: Section) {
  return (
    <Box className="w-3/12">
      <Droppable droppableId={section.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <p>{section.label}</p>
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
