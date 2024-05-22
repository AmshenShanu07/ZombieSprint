import { RefObject, createRef } from 'react'
import { Mesh } from 'three';
import { create } from 'zustand';

export interface GameStoreType {
  heroPoint: number;
  isPaused:boolean;
  speed:number;
  startGame:boolean;
  hero: RefObject<Mesh>;
  gameOver: boolean;
  setGameOver: () => void;
  setHeroPoint: (p:number) => void;
  setStartGame: () => void;
  setGameMode: (isPause:boolean) => void;
  incGameSpeed: () => void;
}

const useGameStore = create<GameStoreType>((set) =>({
  heroPoint: 0,
  isPaused: true,
  speed: 0.03,
  gameOver: false,
  startGame:false,
  hero: createRef<Mesh>(),
  setGameOver: () => {
    return set((state)=>({ 
      ...state, 
      gameOver: true,
      startGame: false,
      speed: 0.03,
      isPaused: true,
    }))
  },
  setStartGame: () => {
    return set((state)=>({ 
      ...state, 
      gameOver: false,
      startGame: true,
      heroPoint: 0,
      speed: 0.03,
      isPaused: false,
    }))
  },
  setGameMode:(isPaused:boolean) => set((state)=>({ ...state, isPaused })),
  incGameSpeed:()=>set((state)=>({ ...state, speed:state.speed + 0.002})),
  setHeroPoint:(p:number) => set((state) => ({ ...state, heroPoint:p })),
}));


export default useGameStore;