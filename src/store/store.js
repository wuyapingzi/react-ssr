// 存储的入口
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import {serverAxios, clientAxios} from '../utils/axios'
import indexReducer from './index'
import userReducer from './user'

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
})

// const Store = createStore(reducer, applyMiddleware(thunk))

// export default Store
export const getServerStore = () => {
  // 服务端用的
  // 通过server的dispatch来获取和充实
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}
export const getClientStore = () => {
  // 通过window.__context 来获取数据
  // 服务断异步请求接口服务器并然后渲染后的 html 字符串，然后前端通过window.__context获取服务端注入的初始 state
  const defaultState = window.__context ? window.__context : {}
  // 客户端用的
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
