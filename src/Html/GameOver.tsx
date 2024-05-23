import useGameStore from '../Hooks/useGameStore'
import './GameOver.css'

const GameOver = () => {
  const { setStartGame } = useGameStore();

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
          <h1>150 <small>Sec</small></h1>
        </div>
        <div className="highscore_con">
          <h3>High Score</h3>
          <h2><span>1.</span>200 <small>sec</small></h2>
          <h2><span>2.</span>200 <small>sec</small></h2>
          <h2><span>3.</span>200 <small>sec</small></h2>
        </div>
      </div>
        <div className="restart_btn_con" onClick={onClickRestart} >
          <h1 className='restart_btn_text' >Restart</h1>
          <h1 className='restart_btn_line' >_____</h1>
        </div>
        <h1 className='creator'>Amshen Yesudas</h1>
    </div>
  )
}

export default GameOver