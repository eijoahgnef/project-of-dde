import React from "react"
import LayoutIndex from "../../Layout/MainLayout"
import { RouteObject } from 'react-router-dom';
import lazyLoad from '../utils/lazyLoad';
import { lazy } from 'react';

const dashboardRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex/>,
    path: '/dashboard',
    children: [
      {
        path: 'dataVisualize',
        element: lazyLoad(
          lazy(() => import('@/pages/dashboard/dataVisualize'))
        )
      },
      {
        path: 'embedded',
        element: lazyLoad(
          lazy(() => import('@/pages/dashboard/embedded'))
        )
      }
    ]
  }
]

export default dashboardRouter