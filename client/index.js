import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Routes from '../src/App.js'
import { getClientStore } from '../src/store/store'
import Header from '../src/component/Header'

const Page = (
  // 使用Provider注入store
  <Provider store={getClientStore()}>
    {/* 客户端使用 BrowserRouter */}
    <BrowserRouter>
      <Header />
      <Switch>
        {Routes.map((route) => (
          <Route {...route}></Route>
        ))}
      </Switch>
    </BrowserRouter>
  </Provider>
)

if (window.__context) {
  // 将页面注入rout dom节点中
  ReactDom.hydrate(Page, document.getElementById('root'))
} else {
  // 将页面注入rout dom节点中
  ReactDom.render(Page, document.getElementById('root'))
}

