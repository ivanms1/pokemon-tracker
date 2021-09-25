import { Pokemon } from "@/generated/generated";
import React from "react";

interface Team {
  team: Pokemon[];
}

function Team({ team }: Team) {
  return (
    <div className="w-3/12">
      <p>Team</p>
      <div>
        {team.map((pokemon) => (
          <div key={pokemon.id}>
            <p>{pokemon.nickname}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
