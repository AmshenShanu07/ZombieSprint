import { create } from 'zustand';

export interface GameStoreType {
  point: number;
  isPaused:boolean;
  setGameMode: (isPause:boolean) => void;
}

const useGameStore = create<GameStoreType>((set) =>({
  point: 0,
  isPaused: true,
  setGameMode:(isPaused:boolean) => set((state)=>({ ...state, isPaused }))
}));


export default useGameStore;