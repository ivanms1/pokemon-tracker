import { Draggable, Droppable } from "react-beautiful-dnd";

import { Pokemon } from "@/generated/generated";

interface Team {
  team: Pokemon[];
}

function Team({ team }: Team) {
  return (
    <Droppable droppableId="IN_TEAM">
      {(provided) => (
        <div
          className="w-3/12"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <p>Team</p>
          <div>
            {team.map((pokemon, index) => (
              <Draggable
                key={pokemon?.id}
                draggableId={pokemon?.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <p>{pokemon.nickname}</p>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Team;
