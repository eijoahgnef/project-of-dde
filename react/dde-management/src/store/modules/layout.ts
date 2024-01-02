import { makeAutoObservable } from 'mobx'
import { ITheme } from '@/interfaces/idnex'

class LayoutStore {
    systemTheme = window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light'
    collapsed: boolean = false
    theme = localStorage.getItem('theme') as ITheme['theme'] || this.systemTheme


    constructor() {
        makeAutoObservable(this)
    }

    changeCollapsed() {
        this.collapsed = !this.collapsed
    }

    changeTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('theme', this.theme)
    }
    
}

export default new LayoutStore()