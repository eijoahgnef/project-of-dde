import React from 'react'
import { Tooltip } from 'antd';
import MoonSvg from '@/assets/header/moon.svg'
import SunSvg from '@/assets/header/sun.svg'
import { useStore, observer } from '@/store'

const Moon = () => {
  return <img src={MoonSvg} alt="moon" />
}

const Sun = () => {
  return <img src={SunSvg} alt="sun" />
}

function SwitchTheme () {
  const { layoutStore } = useStore()

  const changeTheme = () => {
    layoutStore.changeTheme()
  }

  return (
    <Tooltip title={
      layoutStore.theme === 'dark' 
      ? 'Switch to light theme'
      : 'Switch to dark theme'
    }>
      <span className='theme'>
        <div className='switch-theme' onClick={changeTheme}>
          {layoutStore.theme === 'dark' ? <Sun/> : <Moon/>}
        </div>
      </span>
    </Tooltip>
  )
}

export default observer(SwitchTheme)
