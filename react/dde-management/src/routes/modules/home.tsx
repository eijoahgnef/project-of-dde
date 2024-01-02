// 首页模块
import React from "react"
import { RouteObject } from "react-router-dom"
import LayoutIndex from "../../Layout/MainLayout"
import { lazy } from "react"
import lazyLoad from "../utils/lazyLoad"



const homeRouter: Array<RouteObject> = [
    {
        element: <LayoutIndex/>,
        children: [
            {
                path: 'home',
                element: lazyLoad((lazy(() => import ('@/pages/home'))))
            }
        ]
    }
]

export default homeRouter