import { RefObject, createRef } from 'react'
import { Mesh } from 'three';
import { create } from 'zustand';

export interface GameStoreType {
  heroPoint: number;
  modiPoint: number;
  isPaused:boolean;
  speed:number;
  hero: RefObject<Mesh>;
  cap: RefObject<Mesh>
  setHeroPoint: (p:number) => void;
  setModiPoint: (p: number) => void;
  setGameMode: (isPause:boolean) => void;
  incGameSpeed: () => void;
}

const useGameStore = create<GameStoreType>((set) =>({
  heroPoint: 0,
  modiPoint: 0,
  isPaused: true,
  speed: 0.02,
  hero: createRef<Mesh>(),
  cap: createRef<Mesh>(),
  setGameMode:(isPaused:boolean) => set((state)=>({ ...state, isPaused })),
  setHeroPoint:(p:number) => set((state) => ({ ...state, heroPoint:p })),
  setModiPoint:(p:number) => set((state) => ({ ...state, modiPoint:p })),
  incGameSpeed:()=>set((state)=>({ ...state, speed:state.speed + 0.002}))
}));


export default useGameStore;