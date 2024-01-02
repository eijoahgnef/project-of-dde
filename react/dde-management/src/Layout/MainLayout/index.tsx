import React from 'react'
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import LayoutHeader from '../Header';
import LayoutSider from '../Sider';
import Tabtag from '../Tabtag'

const { Content } = Layout;
function LayoutIndex() {
  return (
    <Layout style={{height: '100vh'}}>
        <LayoutHeader/>
        <Layout>
            <LayoutSider/>
            <Content>
              <Tabtag/>
              <Outlet></Outlet>
            </Content>
        </Layout>
    </Layout>
  )
}

export default LayoutIndex
