import React from 'react'
import { Layout } from 'antd';
import logo from '@/assets/react.svg'
import CollapseIcon from './components/collapseIcon';
import './index.less'
import SwitchTheme from './components/switchTheme';
import UserIcon from './components/userIcon';

function LayoutHeader () {
  return (
    <Layout.Header>
      <div className="logo">
        <img src={logo} alt="" />
        <span>呆呆鵝后台管理系统</span>
      </div>
      <div className="header-left">
        <CollapseIcon/>
      </div>
      <div className="header-right">
        <SwitchTheme/>
        <UserIcon/>
      </div>
    </Layout.Header>
  ) 
}

export default LayoutHeader