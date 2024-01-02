import { useContext, createContext } from "react";
import LayoutStore from  './modules/layout'
import MenuStore from './modules/menu'
import { observer } from "mobx-react-lite";

const rootStore = {
    layoutStore: LayoutStore,
    menuStore: MenuStore
}

const context = createContext(rootStore)
export const useStore = () => useContext(context)
export { observer }