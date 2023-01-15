/*
 * @Date: 2023-01-09 22:56:09
 * @LastEditors: fuhaioliang
 * @LastEditTime: 2023-01-09 23:03:38
 * @FilePath: /webapp/src/global.d.ts
 */
declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
  }
}

declare namespace HTTP {
  interface ApiObject {
    url: string
    method: 'POST' | 'GET' | 'OPTIONS' | 'HEAD' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined
    [propsName: string]: any
  }

  // 响应体
  interface Response {
    errMsg: string
    statusCode?: number
    data: ResponseData
    header?: {}
    cookies?: []
  }

  interface ResponseData {
    code: number
    msg: string
    data?: Array<any> | Object
    [key: string]: any
  }

  // 自定义参数
  interface CustomOptions {
    showError?: boolean // 是否显示错误信息
    mock?: boolean // 是否走mock数据
    isNeedResponse?: boolean // 是否需要完整响应
  }

  interface ErrObj {
    code: number
    msg: string
  }
}

declare namespace DVA {
  interface DispatchObj {
    type: string
    payload?: Object
  }

  interface ActionObj {
    payload: Object
  }

  interface EffectObj {
    put?: any // 用于触发 action
    call?: any // 用于调用异步逻辑，支持 promise
    select?: any // 用于从 state 里获取数据
  }
}
