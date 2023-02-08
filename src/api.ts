export const API = 'http://120.48.107.230:8992' //测试环境

// export const API = process.env.BASE_URL

export default {
  // 登录
  login: { url: `${API}/gallery/system/login`, method: 'POST' }, //登录
  deptList: { url: `${API}/gallery/system/dept/list`, method: 'GET' }, //登录
  register: { url: `${API}/gallery/system/user/register`, method: 'POST' }, //登录
}
// module.exports = API_CONST
