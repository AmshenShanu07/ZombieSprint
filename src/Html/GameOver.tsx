import './GameOver.css'
import useGameStore from '../Hooks/useGameStore'

interface GameOverProps {
  time: number;
}

const GameOver = ({ time }:GameOverProps) => {
  const { setStartGame, highScore } = useGameStore()

  const onClickRestart = () => {
    setStartGame();
  }

  return (
    <div className='game_over_con' >
      <img src="/images/banner.png" className='go_banner_img' alt="" />
      <div className='text_con' >
        <h1 className='game_over_text'>Game Over</h1>
        <h1 className='game_over_line'>_______</h1>
      </div>
      <div className="score_con">
        <div className="crnt_score_con">
          <h3>Survival Time</h3>
          <h1>{time} <small>Sec</small></h1>
        </div>
        <div className="highscore_con">
          <h3>High Score</h3>
          {highScore.map((d,i) =>(
            <h2 key={i} ><span>{i+1}.</span>{d==0?'___':d} <small>sec</small></h2>
          ))}
        </div>
      </div>
        <div className="restart_btn_con" onClick={onClickRestart} >
          <h1 className='restart_btn_text' >Restart</h1>
          <h1 className='restart_btn_line' >_____</h1>
        </div>
        <a className='creator' href="https://amshen.tech" target='_blank' >
          <h1 >Sh4nu <br />(Amshen Yesudas)</h1>
        </a>
    </div>
  )
}

export default GameOver