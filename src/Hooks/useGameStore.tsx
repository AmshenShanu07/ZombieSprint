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
  mute: boolean;
  highScore:number[];
  health: number;
  setHealth: (health:number) => void;
  setHighScore: (score:number[]) => void;
  setGameOver: () => void;
  setHeroPoint: (p:number) => void;
  setStartGame: () => void;
  setMute: (mute:boolean) => void;
  setGameMode: (isPause:boolean) => void;
  incGameSpeed: () => void;
}

const useGameStore = create<GameStoreType>((set) =>({
  heroPoint: 0,
  isPaused: true,
  speed: 0.03,
  gameOver: false,
  startGame:false,
  mute: false,
  highScore:[0,0,0],
  health: 100,
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
      health:100,
      isPaused: false,
    }))
  },
  setHealth: (health:number) => set((state) => ({ ...state, health })),
  setMute:(mute:boolean) => set((state)=>({ ...state, mute })),
  setHeroPoint:(p:number) => set((state) => ({ ...state, heroPoint:p })),
  incGameSpeed:()=>set((state)=>({ ...state, speed:state.speed + 0.005})),
  setGameMode:(isPaused:boolean) => set((state)=>{
    return ({ ...state, isPaused }

    )}),
  setHighScore: (highScore:number[]) => set((state) =>({ ...state, highScore })),
}));


export default useGameStore;