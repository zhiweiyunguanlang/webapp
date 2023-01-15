import Taro from '@tarojs/taro'
import apiNames from '../api'

// 错误码
export enum ErrNos {
  NOAURH = -1,
  NETWORK = -2,
  HTTP = -3,
  API = -4,
}

// 请求拦截器，添加headers信息
export const requestInterceptors = function (chain) {
  let requestParams = chain.requestParams
  requestParams.headers = { ...requestParams.requestParams }
  let Token = requestParams.headers['zw-token'] || Taro.getStorageSync('token')
  requestParams.headers['zw-token'] = Token
  return chain.proceed(requestParams)
}
// 响应拦截器，格式化response
export const responseInterceptor = function (response: HTTP.Response): HTTP.Response {
  const { errMsg = '', statusCode, data = { code: -1, msg: '网络超时' } } = response
  let errObj: HTTP.ErrObj = { msg: errMsg, code: 0 }
  switch (true) {
    case errMsg.includes('request:fail timeout'): //网络超时
      errObj = { msg: '网络超时', code: ErrNos['NETWORK'] }
      break
    case errMsg.includes('request:fail'): //网络异常
      errObj = { msg: '网络异常', code: ErrNos['NETWORK'] }
      break
    case errMsg === 'request:ok' && statusCode !== 200: // HTTP异常
      errObj = { msg: data.msg || '请求异常', code: ErrNos['HTTP'] }
      break
    case errMsg === 'request:ok' && data.code !== 0: // code码非0
      errObj = { msg: data.msg || 'code码异常', code: ErrNos['API'] }
      break
    default:
      errObj = { msg: data.msg, code: 0 }
      break
  }

  response.data ? (response.data = { ...response.data, ...errObj }) : (response.data = errObj)
  return response
}
// 真实taro请求
export const HttpRequest = async function (requestOptions: Taro.request.Option) {
  const response: HTTP.Response = await new Promise((resolve) => {
    Taro.request({
      ...requestOptions,
      complete(req: TaroGeneral.CallbackResult) {
        resolve(responseInterceptor(req as HTTP.Response))
      },
    })
  })
  return response
}

Taro.addInterceptor(requestInterceptors)
Taro.addInterceptor(Taro.interceptors.logInterceptor)
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)

interface argus {
  params?: Record<string, any>
  customOptions?: HTTP.CustomOptions
  options?: Taro.request.Option
}

interface HTTPApiObj {
  (argus: argus): Promise<HTTP.ResponseData | HTTP.Response>
}

interface A {
  [key: string]: HTTPApiObj
}

// 或者也可以拼接 keyof 获取所有的 keytype resultKeys = keyof ReturnType<typeof func>
// 亦或者可以放在`Object`中作为动态的`key`存在type infoJson = Record<keyof ReturnType<typeof func>, string>
const HTTP: A = {}

for (let apiName in apiNames) {
  const { url, method } = apiNames[apiName] as HTTP.ApiObject
  HTTP[apiName] = async function ({ params, customOptions, options }: argus) {
    // 初始化customOptions
    customOptions = Object.assign({ showError: true, mock: false, isNeedResponse: false }, customOptions)
    const response: HTTP.Response = await HttpRequest({ url, method, data: params || {}, ...(options || {}) })

    const {
      data: { code, msg },
    } = response
    // 权限判定
    if (code == 401) {
      Taro.showToast({
        title: '请登录',
        icon: 'loading',
        duration: 1500,
        mask: true,
      }).then(() => Taro.navigateTo({ url: '/pages/login/index' }))
    }
    // 是否显示错误
    if (customOptions.showError && code !== 0) {
      Taro.showToast({ title: msg, icon: 'none', mask: true })
    }
    // 是否需要完整response
    return !customOptions.isNeedResponse ? response.data : response
  }
}

export default HTTP
