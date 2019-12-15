import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../store/user'

const User = (props) => {
  console.log('props.userinfo--=====', props.userinfo)
  return (
    <div>
      <h1>hello ! {props.userinfo.name},你们最棒的人是{props.userinfo.best}</h1>
    </div>
  )
}

User.loadData = (store) => {
  return store.dispatch(getUserInfo())
}

export default connect(
  state => {
    console.log('state----=====', state)
    return ({userinfo: state.user.userinfo})
  },
  // {getIndexList}
)(User)