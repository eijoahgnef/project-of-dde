import { makeAutoObservable } from "mobx";
import { MenuItem, ITabs, MenuOptions } from '@/interfaces/idnex'

class MenuStore {
    menuList: MenuItem[] = []
    menuData: MenuOptions[] = []
    tabList: ITabs[] = []

    constructor() {
        makeAutoObservable(this)
        this.resetTab()
    }

    setMenuList(menuList: MenuItem[]) {
        this.menuList = menuList
    }

    setMenuData(menuData: MenuOptions[]) {
        this.menuData = menuData
    }


    removeTab(tabPath: string) {
        if (this.tabList.length === 1) return
        this.tabList = this.tabList.filter(item => item.path !== tabPath)
        window.sessionStorage.setItem('tabList', JSON.stringify(this.tabList))
    }

    resetTab() {
        this.tabList = [
            // { label: '首頁', path: '/home', key: '/home', closable: false}
            { label: '首頁', children: '首页', key: '/home', path: '/home', closable: false },
        ]
    }

    setTabList(list: Array<ITabs>) {
        this.tabList = list
    }
    addTabList(pathname: string) {
        const menu = this.getMenuByPath(pathname)
        this.tabList.push({
            label: menu?.title || pathname,
            path: pathname,
            key: pathname
        })
        console.log(this.tabList);

    }
    getMenuByPath(path: string) {
        const dfs = (menu: MenuOptions[], path: string): MenuOptions | undefined => {
            for (const item of menu) {
                if (item.path === path) {
                    return item
                }
                if (item.children) {
                    const res = dfs(item.children, path)
                    if (res) {
                        return res
                    }
                }
            }
        }

        return dfs(this.menuData, path)
    }
    
    // 关闭其他，关闭所有
    closeMultipleTab(tabPath?: string) {
        this.tabList = this.tabList.filter(item => {
            return item.path === tabPath || item.path === '/home'
        })
        window.sessionStorage.setItem('tabList', JSON.stringify(this.tabList))
    }

}

export default new MenuStore()