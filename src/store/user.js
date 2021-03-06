// 首页的逻辑
import axios from '../utils/axios'

// actionType
const GET_LIST = 'INDEX/USER_INFO'

// actionCreator
const changeUserInfo = (data) => ({
  type: GET_LIST,
  data
})

export const getUserInfo = (server) => {
  return (dispatch, getState, $axios) => {
    return $axios.get('/api/user/info').then((res) => {
      const { data } = res
      console.log('data-------', res)
      dispatch(changeUserInfo(data))
    })
  }
}

// 首页初始数据
const defaultState = {
  userinfo: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        userinfo: action.data
      }
      return newState
    default:
      return state
  }
}
