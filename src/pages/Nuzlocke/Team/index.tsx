import { Draggable, Droppable } from "react-beautiful-dnd";

import Box from "@/components/Box";
import TeamPokemon from "@/components/TeamPokemon";

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
            <div>
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
                      <TeamPokemon pokemon={pokemon} />
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
