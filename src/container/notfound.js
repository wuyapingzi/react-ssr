import React from 'react'
import {Route} from 'react-router-dom'

const Status = ({code, children}) => {
  return (
    <Route
      render={({staticContext}) => {
        if (staticContext) {
          staticContext.statuscode = code
        }
        return children
      }}
    />
  )
}

const Notfound = (props) => {
  // console.log('notfound  props===', props)
  // 渲染这里时，给context的status赋值404
  return (
    <Status code={404}>
      <p>404</p>
      <img className='img-404' src='/404.jpeg' alt="not-Found"/>
    </Status>
  )
}

export default Notfound