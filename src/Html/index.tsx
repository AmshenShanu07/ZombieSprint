import { useEffect, useState } from 'react';
import './html.css';
import useGameStore from '../Hooks/useGameStore';
import Banner from './Banner';
import GameOver from './GameOver';
import { HighScoreType } from '../utils/constant';

const HtmlOverlay = () => {
  const [time, setTime] = useState<number>(0);
  const { 
    isPaused, speed, heroPoint, startGame, gameOver, health,
    incGameSpeed, setGameMode, setHighScore, setHealth, setGameOver,
  } = useGameStore();

  const onClickPlayPause = () => {
    setGameMode(!isPaused)
  }

  useEffect(() => {
    if(health<= 0) {
      setGameOver();
    }

    const intervalId = setInterval(() => {
      if(!isPaused) {
        setTime(prevTime => (prevTime + 1));
        speed < 0.2 && incGameSpeed();
        setHealth(health-1)
      } else {
        setTime(prevTime => prevTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused,speed, health]);

  useEffect(() => {
    if(!gameOver) {
      setTime(0);
      return;
    }
    
    const highScore: HighScoreType | null = JSON.parse(localStorage.getItem('score') || '{}');

    if(highScore?.score) {
      const  tempHighScore = [...highScore.score];
      tempHighScore[3] = time;
      tempHighScore.sort((a,b) => b - a);
      const hScore = [...tempHighScore.slice(0,3)];
      setHighScore(hScore)
      localStorage.setItem('score',JSON.stringify({ score: hScore }))
    } else {
      setHighScore([time,0,0])
      localStorage.setItem('score',JSON.stringify({ score:[time,0,0] }))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[gameOver]);

  return (
    <main className='overlay_con'>
      {(startGame)?<>
        <div onClick={onClickPlayPause} className="game_mode">
          <img 
            className='play_pause' alt=""
            src={`/images/${!isPaused?'pause':'play'}.svg`} 
          />
        </div>

        <div className="health_con">
          <div className='health_progress_con' >
            <div 
              className={`health_progress ${health<30 && 'health_bar_blink'}`} 
              style={{ width: `${health}%` }}
            ></div>
          </div>
          <h5 className='heatlh_percentage' >{health}%</h5>
        </div>
        <div className="hud_con">
          <h5 className='hud_title' >Time</h5>
          <h3 className='hud_text' >{time}</h3>
          <h5 className='hud_title' >Score</h5>
          <h3 className='hud_text' >{heroPoint}</h3>
        </div>
      </>: <></>}
      {!startGame && !gameOver?<Banner/>:<></>}
      {gameOver?<GameOver time={time} />:<></>}
    </main>
  )
}

export default HtmlOverlay