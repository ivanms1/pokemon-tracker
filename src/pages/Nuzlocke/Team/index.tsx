import { Draggable, Droppable } from "react-beautiful-dnd";

import Box from "@/components/Box";
import PokemonImage from "@/components/PokemonImage";

import { Pokemon } from "@/generated/generated";

interface Team {
  team: Pokemon[];
}

function Team({ team }: Team) {
  return (
    <Box className="w-3/12">
      <Droppable droppableId="IN_TEAM">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <p>Team</p>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center">
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
