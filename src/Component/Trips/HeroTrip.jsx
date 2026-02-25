import React from 'react'
import style from '../../Style/City/City.module.css';
import video from '../../Assets/videos/Travel trip _CapCut _template _travel _vlog _hthjnhhh _capcut_huuthinh(MP4).mp4'

const HeroTrip = () => {
  return (
    <div>
      <div className={style.hero}>
        <video className={style.video} src={video} autoPlay loop muted></video>
      </div>
    </div>
  )
}

export default HeroTrip
