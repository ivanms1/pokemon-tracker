import type { Nuzlocke as NuzlockeProps } from "@/generated/generated";
import React from "react";

interface Nuzlocke {
  nuzlocke: NuzlockeProps;
}

function Nuzlocke({ nuzlocke }: Nuzlocke) {
  return (
    <div>
      <p>{nuzlocke?.title}</p>
    </div>
  );
}

export default Nuzlocke;
