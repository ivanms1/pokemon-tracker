import { Pokemon } from "@/generated/generated";
import create from "zustand";

type AppState = {
  selectedPokemon: Pokemon | null;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
};

const useStore = create<AppState>((set) => ({
  selectedPokemon: null,
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
}));

export default useStore;
