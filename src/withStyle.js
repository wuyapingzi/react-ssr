import React from 'react'

function WithStyle(Comp, styles) {
  return function (props) {
    if (props.staticContext) {
      // styles._getCss() 只有服务端ssr才支持的方法
      console.log('styles._getCss()---', styles._getCss())
      // 将获取到的样式通过context传入代码中
      props.staticContext.css.push(styles._getCss())
    }
    return  <Comp {...styles} />
  }
}

export default WithStyle