// 存储的入口
import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from 'redux-thunk'

import indexReducer from './index'
import userReducer from './user'

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
})

const Store = createStore(reducer, applyMiddleware(thunk))

// export default Store
export const getServerStore = () => {
  // 服务端用的
  // 通过server的dispatch来获取和充实
  return createStore(reducer, applyMiddleware(thunk))
}
export const getClientStore = () => {
  // 通过window.__context 来获取数据
  const defaultState = window.__context ? window.__context : {}
  // 客户端用的
  return createStore(reducer, defaultState, applyMiddleware(thunk))
}
