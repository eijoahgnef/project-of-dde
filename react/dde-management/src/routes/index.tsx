// 路由的几种管理
import React from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

// 动态导入router  import.meta.glob  用于读取文件
const modules: any = import.meta.glob("./modules/*.tsx", {eager: true})


// 常规页面
export const routerArray : RouteObject[]= []

Object.keys(modules).forEach(item => {
    routerArray.push(...modules[item]['default'])
})


export const rootROuter: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to='/home'/>
    },
    ...routerArray,
    {
        path: '*',
        element: <Navigate to='/404' />
    }
]

export default function Router() {
    return useRoutes(rootROuter)
}