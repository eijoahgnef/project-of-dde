import React from 'react';
import { SettingOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore, observer } from '@/store'


function ActionButton(props: any) {
    const { pathname } = useLocation()
    const { menuStore } = useStore()
    const navigate = useNavigate()

    const items = [
        {
            key: '1',
            label: <span>关闭当前</span>,
            onClick: () => props.removeTab(pathname)
        },
        {
            key: '2',
            label: <span>关闭其他</span>,
            onClick: () => menuStore.closeMultipleTab(pathname)
        },
        {
            key: '3',
            label: <span>关闭所有</span>,
            onClick: () => {
                menuStore.closeMultipleTab()
                navigate('/home')
            }
        },
    ];

    return (
        <Dropdown menu={{ items }} placement="bottom" arrow>
            <SettingOutlined />
        </Dropdown>
    )
}

export default observer(ActionButton)