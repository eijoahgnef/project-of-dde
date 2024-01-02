import React from 'react'
// import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom'
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd';

function UserIcon () {
  const navigate = useNavigate()

  // 退出登录
  const logout = () => {
    Modal.confirm({
      title: '温馨提示!',
      icon: <ExclamationCircleOutlined />,
      content: '是否确定退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        localStorage.setItem('auth-token', '')
        message.success('退出登录成功!')
        navigate('/login')
      }
    });
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (<span className='dropdown-item'>首页</span>),
      onClick: () => navigate('/home')
    },
    {
      key: '2',
      label: (<span className='dropdown-item'>修改密码</span>),
      onClick: () => navigate('/changeInfo')
    },
    {
      key: '3',
      label: (<span className='dropdown-item'>退出登录</span>),
      onClick: logout
    }
  ];


  return (
    <div className="user-info">
      <Dropdown menu={{ items }}>
        <div>
          <Avatar size={30} icon={<UserOutlined />} />
          <span style={{margin: '8px'}}>admin</span>
        </div>
      </Dropdown>
    </div>
  )
}

export default UserIcon
