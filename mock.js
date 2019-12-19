// 模拟接口

const express = require('express')

const app = express()

app.get('/api/course/list', (req,res) => {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  // res.header('Content-Type', 'application/json;charset=utf-8')
  res.json({
    code: 0,
    list:[
      {name: 'web1111', id: 1},
      {name: 'web222', id: 2},
      {name: 'web3333', id: 3},
      {name: 'web4444', id: 4},
      {name: 'web5555', id: 5}
    ]
  })
})

app.get('/api/user/info', (req,res) => {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  // res.header('Content-Type', 'application/json;charset=utf-8')
  res.json({
    code: 0,
    data: {
      name: '开课吧',
      best: '平平平子'
    }
  })
})
app.listen(9090, () => {
  console.log('mock 启动完毕')
})