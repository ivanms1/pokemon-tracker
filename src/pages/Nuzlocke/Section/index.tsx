import { Draggable, Droppable } from "react-beautiful-dnd";

import { Pokemon } from "@/generated/generated";
import SectionPokemon from "@/components/SectionPokemon";

interface Section {
  section: {
    id: string;
    label: string;
  };
  pokemons: Pokemon[];
}

function Section({ pokemons, section }: Section) {
  return (
    <Droppable droppableId={section.id}>
      {(provided) => (
        <div
          className="w-3/12"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <p>{section.label}</p>
          <div>
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
                    <SectionPokemon pokemon={pokemon} />
                  </span>
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

export default Section;