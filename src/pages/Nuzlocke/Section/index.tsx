import { Pokemon } from "@/generated/generated";
import React from "react";

interface Section {
  section: {
    id: string;
    label: string;
  };
  pokemons: Pokemon[];
}

function Section({ pokemons, section }: Section) {
  return (
    <div className="w-3/12">
      <p>{section.label}</p>
      <div>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id}>
            <p>{pokemon.nickname}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section;
