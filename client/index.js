import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from '../src/App.js'
import store from '../src/store/store'

const Page = (
  // 使用Provider注入store
  <Provider store={store}>
    {/* 客户端使用 BrowserRouter */}
    <BrowserRouter>
      {App}
    </BrowserRouter>
  </Provider>
)

// 将页面注入rout dom节点中
ReactDom.hydrate(Page, document.getElementById('root'))