import React, { useCallback, useEffect, useState } from 'react';
import * as Icons from '@ant-design/icons';
import { Menu } from 'antd';
import { request } from '@/api/request'
import { useQuery } from 'react-query'
import { useStore, observer } from '@/store/index'
import { MenuOptions, MenuItem } from '@/interfaces/idnex'
import { useNavigate, useLocation } from 'react-router-dom';

// type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}



const MenuList: React.FC = () => {
  const { menuStore, layoutStore } = useStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [selectedKeys, setSelectedKeys] = useState([pathname])

  useEffect(() => {
    setSelectedKeys([pathname])
  }, [pathname])
  // useEffect(() => {
  //     request.get('/menu/list').then(res => {
  //         console.log(res);

  //     })
  // }, [])

  // const { isLoading, isError } = 
  useQuery(
    'menuList',
    () => request.get('/menu/list').then(res => res.data.data),
    {
      onSuccess: (data: any) => {
        console.log(data,'----');
        menuStore.setMenuList(deepLoopFloat(data))  // 整理过的菜单
        menuStore.setMenuData(data)
        console.log(menuStore.menuData);
        
      },
      onError: () => { }
    }
  )
  const customIcons: { [key: string]: any } = Icons
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name])
  }

  const deepLoopFloat = useCallback((menuList: MenuOptions[], newArr: MenuItem[] = []) => {
    menuList.forEach((item: MenuOptions) => {
      if (!item.children?.length) {
        return newArr.push(
          getItem(item.title, item.path, addIcon(item.icon!)),
        )
      }

      newArr.push(
        getItem(
          item.title,
          item.path,
          addIcon(item.icon!),
          deepLoopFloat(item.children)
        )
      )
    })
    return newArr
  }, [])

  const goToggle = (event: any) => {
    navigate(event.key)
    // console.log(event);

  }
  return (
    <div>

      <Menu
        selectedKeys={selectedKeys}
        defaultOpenKeys={['/home']}
        mode="inline"
        theme={layoutStore.theme}
        items={menuStore.menuList}
        onClick={goToggle}
      />
    </div>
  );
};

export default observer(MenuList);