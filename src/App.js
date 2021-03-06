/**
 * 入口文件，根据路由渲染组件
 */

import React, { useState } from 'react'
import { Route } from 'react-router-dom'

import Index from './container/index'
import About from './container/about'
import User from './container/user'
import Notfound from './container/notfound'
import Login from './container/login'

// import './App.css'

// export default (
//   <div>
//     <Route path="/" exact component={Index}></Route>
//     <Route path="/about" exact component={About}></Route>
//   </div>
//   )
export default [
  {
    path: '/',
    component: Index,
    exact: true,
    key: 'index'
  },
  {
    path: '/about',
    component: About,
    exact: true,
    key: 'about'
  },
  {
    path: '/user',
    component: User,
    exact: true,
    key: 'user'
  },
  {
    path: '/login',
    component: Login,
    key: 'login',
    exact: true
  },
  {
    component: Notfound,
    key: 'not-found'
  }
]
