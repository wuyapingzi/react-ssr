// 这里的node代码会被babel处理
import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'

import App from '../src/App.js'

const app = express()
app.use(express.static('public'))

app.get('/', (req, res) => {
  // 把react组件解析成html
  const content = renderToString(App)
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