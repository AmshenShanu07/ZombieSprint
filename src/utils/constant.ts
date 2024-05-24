export enum Controls {
  left = 'left',
  right = 'right',
  pausePlay = 'pausePlay'
}

export type HighScoreType = {
  score: number[]
}

export const isMobile = innerWidth <= 700