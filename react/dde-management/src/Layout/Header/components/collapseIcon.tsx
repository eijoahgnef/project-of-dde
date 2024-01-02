import React from 'react'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import { useStore, observer } from '@/store'

const visibleStyles = {display: 'block', cursor: 'pointer'}
const hiddenStyles = {display: 'none'}


function CollapseIcon() {
  const { layoutStore } = useStore()
  // console.log(layoutStore);
  
  const handleClick = () => {
    layoutStore.changeCollapsed()
  }

  return (
    <div className="collapsed" onClick={handleClick}>
      <MenuFoldOutlined style={layoutStore.collapsed ? hiddenStyles : visibleStyles}/>
      <MenuUnfoldOutlined style={layoutStore.collapsed ? visibleStyles : hiddenStyles}/>
    </div>
  )
}

export default observer(CollapseIcon)
