// 这里的node代码会被babel处理
import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from '../src/App.js'
import store from '../src/store/store'

const app = express()
app.use(express.static('public')) // 设置加载静态资源的目录为public

// 监听所有路由，这样不会在浏览器报404错误
app.get('*', (req, res) => {
  // 把react组件解析成html
  const content = renderToString(
    // 使用Provider向页面中注入store
    <Provider store={store}>
      <StaticRouter location={req.url}>
        {App}
      </StaticRouter>
    </Provider>

  )
  // 字符串模版
  res.send(`
  <html>
    <head>
      <meta charset="utf-8" />
      <title>react ssr</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
  `)
})

app.listen(9093, () => {
  console.log('监听完毕')
})
