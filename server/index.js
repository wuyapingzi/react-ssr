// 这里的node代码会被babel处理
import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import chalk from 'chalk'
import proxy from 'http-proxy-middleware'
import path from 'path'
import fs from 'fs'

import Routes from '../src/App.js'
import { getServerStore } from '../src/store/store'
import Header from '../src/component/Header'

const app = express()
app.use(express.static('public')) // 设置加载静态资源的目录为public
// 使用http-proxy-middleware 插件 解决跨域
// 客户端来的api开头的请求
app.use(
  '/api',
  proxy({
    target: 'http://localhost:9090',
    changeOrigin: true
  })
)

const store = getServerStore()

function csrRender(res) {
  // 读取csr文件 返回
  const filename = path.resolve(process.cwd(), 'public/index.csr.html')
  const html = fs.readFileSync(filename, 'utf-8')
  return res.send(html)
}
// 监听所有路由，这样不会在浏览器报404错误
app.get('*', (req, res) => {
  if (req.query._mode === 'csr') {
    console.log('url参数开启csr')
    return csrRender(res)
  }
  // 把react组件解析成html
  // 获取路由渲染的组件，进而获取组件的loadData方案获取数据
  // 存储网络请求
  const promises = []
  Routes.some((route) => {
    const match = matchPath(req.path, route)
    if (match) {
      const { loadData } = route.component
      if (loadData && typeof loadData === 'function') {
        // promises.push(loadData(store))
        // 处理异步任务报错，页面不会渲染
        promises.push(
          // 不管loadData执行是否错误，都会resolve出去，方式任务失败导致Promise.all(promises).then 方法不会执行，并且也可以在catch中打印错误日志。
          new Promise((resolve) => {
            loadData(store)
              .then(resolve)
              .catch((err) => {
                console.error(chalk.redBright(err))
                resolve(err)
              })
          })
        )
      }
    }
  })

  // 等待所有的网络请求结束后再渲染
  Promise.all(promises)
    .then(() => {
      // This context object contains the results of the render
      let context = {
        css: [] // 将css放入context中
      }
      const content = renderToString(
        // 使用Provider向页面中注入store
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Header />
            <Switch>
              {Routes.map((route) => (
                <Route {...route}></Route>
              ))}
            </Switch>
          </StaticRouter>
        </Provider>
      )

      console.log('context====', context)
      if (context.statuscode) {
        // 做状态切换和页面跳转
        res.status(context.statuscode)
      }
      if (context.action === 'REPLACE') {
        res.redirect(301, context.url)
      }
      const css = context.css.join('\n')
      console.log('css------33',css)
      // 字符串模版
      res.send(`
  <html>
    <head>
      <meta charset="utf-8" />
      <title>react ssr</title>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
      <style>
        ${css}
      </style>
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
        window.__context = ${JSON.stringify(store.getState())}
      </script>
      <script src="/bundle.js"></script>
    </body>
  </html>
  `)
    })
    .catch(() => {
      res.send('页面报错了')
    })
})

app.listen(9093, () => {
  console.log('监听完毕')
})
