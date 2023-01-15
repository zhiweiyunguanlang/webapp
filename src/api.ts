/*
 * @Author: your name
 * @Date: 2020-03-10 22:31:46
 * @LastEditTime: 2023-01-09 23:08:21
 * @LastEditors: fuhaioliang
 * @Description: In User Settings Edit
 * @FilePath: /webapp/src/api.ts
 */
export const API = 'http://120.48.107.230:8992' //测试环境
// export const API = 'https://ishopping.bfcsh.com' // 生产环境
// export const API = 'https://ishopping02.bfcsh.com:8443' // 生产环境
// export const API  = 'http://172.18.6.111:9527' //bfc测试环境

// export const API = process.env.BASE_URL

export default {
  // 登录
  login: { url: `${API}/gallery/system/login`, method: 'POST' }, //登录
}

// module.exports = API_CONST
