import Hero from './Hero';
import Floor from './Floor';
import Sound from './Sound';
import Modi from './Villian';
import Boundry from './Stones';
import CoinsGenerator from './Coins';
import ObstacleGenerator from './Obstacle';

const Experience = () => {
  return (
    <>
      <CoinsGenerator/>
      <ObstacleGenerator/>
      <Hero/>
      <Modi/>
      <Floor/>
      <Boundry/>
      <Sound/>
    </>
  )
}

export default Experience;


