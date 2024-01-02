import React from 'react'
import { Layout } from 'antd';
import { useStore } from '@/store/index'
import { observer } from '@/store'
import MenuList from './compoents/menuList';

function LayoutSider() {
    const { layoutStore } = useStore()
  return (
    <Layout.Sider width={200} theme={layoutStore.theme} collapsed={layoutStore.collapsed}>
        <MenuList/>
    </Layout.Sider>
  )
}


export default observer(LayoutSider)