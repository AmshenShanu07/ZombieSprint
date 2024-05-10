import { useEffect, useState } from 'react'
import useGameStore from '../Hooks/useGameStore';
// import { useFrame } from '@react-three/fiber';

function Timer() {
  const { isPaused } = useGameStore();
  const [time, setTime] = useState(0);
  // const [isInc, setIsInc] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if(!isPaused) {
        setTime(prevTime => prevTime + 1);
      } else {
        setTime(prevTime => prevTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  // useFrame(() => {
  //   if(time%5==0 && !isInc) {
  //     setIsInc(true);
  //     incGameSpeed();
  //   } else {
  //     setIsInc(false);
  //   }
  // })

  return <p>Time:{time}</p>;
}

export default Timer