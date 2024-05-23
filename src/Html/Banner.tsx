import { useProgress } from '@react-three/drei';
import useGameStore from '../Hooks/useGameStore';
import './Banner.css';

const Banner = () => {
  const { loaded, total } = useProgress();
  const { mute, startGame, setMute, setStartGame } = useGameStore();

  const toggleMute = () => {
    setMute(!mute);
  }

  // useEffect(() => {
  //   console.log((loaded/total)*100);
    
  // },[loaded])

  if(startGame) return <></>
  
  return (
    <div className={`banner_con ${total === 20 && 'banner_blink'}`} >
      <img 
        src="/images/banner.png"
        alt=""
        className='banner_img'
      />
      <div className="game_content">

       {total !== 20?
       <div className='loader_con'>
          <div className="loader">
            <div className='load_progress' style={{ width: `${Math.round((loaded/20)*100)}%` }}  ></div>
          </div>
          <h3 className='percentage' >{Math.round((loaded/20)*100)}%</h3>
        </div>:
        <>
          <div className="start_btn" onClick={setStartGame} >
            <h2 className='start_text' >
              Start
            </h2>
            <h2 className='start_underline' >
              ____
            </h2>
          </div>
          <h2 className='music_btn' onClick={toggleMute} >
            Turn Music {mute?'On':'Off'}
          </h2>
          <h2 className='controls_info' >
            Controls <br />
            {'<- a / d ->'} <br />
            Space to Pause/Play
          </h2>
          <h1 className='creator'>Amshen Yesudas</h1>
        </> }
      </div>
    </div>
  )
}

export default Banner