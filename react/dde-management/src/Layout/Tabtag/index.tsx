import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { useStore, observer } from '../../store/index'
import { routerArray } from '@/routes/index';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import ActionButton from './components/actionButton';

function Tabtag() {
    // const { TabPane } = Tabs
    const { menuStore } = useStore()
    const { pathname } = useLocation()
    const [tabData, setTabData] = useState(menuStore.tabList)
    const navigate = useNavigate()
    useEffect(() => {
        addTab()
        setTabData([...menuStore.tabList])

    }, [pathname, menuStore.tabList.length])

    // add tabs
    const addTab = () => {
        const route = matchRoutes(routerArray, pathname)
        console.log(route, pathname);
        if (!route) return
        if (menuStore.tabList.every((item) => item.path !== pathname)) {
            menuStore.addTabList(pathname)
        }
    }


    const tabChange = (path: string) => {
        navigate(path)
    }

    const removeTab = (tabPath: string): any => {
        menuStore.tabList.forEach((item, index) => {
            if (item.path === tabPath) {
                const nextTab = menuStore.tabList[index + 1] || menuStore.tabList[index - 1]
                navigate(nextTab.path)
                
            }
        })
        menuStore.removeTab(tabPath)
    }

    return (
        <div>
            <Tabs
                type="editable-card"
                onChange={tabChange}
                activeKey={'1'}
                onEdit={(path) => {
                    removeTab(path as string)
                }}
                tabBarExtraContent={<ActionButton removeTab={removeTab}/>}
                items={tabData}
            ></Tabs>
        </div>
    )
}

export default observer(Tabtag)