// 首页的逻辑
// import axios from '../utils/axios'

// actionType
const GET_LIST = 'INDEX/GET_LIST'

// actionCreator
const changeList = (list) => ({
  type: GET_LIST,
  list
})

export const getIndexList = (server) => {
  return (dispatch, getState, $axios) => {
    return $axios.get('/api/course/list').then((res) => {
      console.log('首页数据请求---', res)
      const { list } = res
      dispatch(changeList(list))
    })
  }
}

// 首页初始数据
const defaultState = {
  list: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        list: action.list
      }
      return newState
    default:
      return state
  }
}
