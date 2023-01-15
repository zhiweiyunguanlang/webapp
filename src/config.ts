import Taro from '@tarojs/taro'

export default {
  encryptKey: 'www.gal.com12345',
  baseUrl: 'http://115.159.25.182:8990/',
  authorities: Taro.getStorageSync('authorities') || '',
  videoUrl: Taro.getStorageSync('videoUrl') || '',
  userInfo: JSON.parse(Taro.getStorageSync('userInfo') || '{}') || {},
  setBaseUrl(url) {
    this.baseUrl = url
  },
  setUserInfo(userInfo) {
    this.userInfo = userInfo
  },
  setAuth(authorities) {
    this.authorities = authorities
  },
  imgType: ['jpg', 'png', 'gif', 'peg', 'jpeg'],
  audioType: ['mp3', 'wma', 'mav', 'aac', 'flac', 'ape', 'ogg', 'm4a', 'amr', 'awb'],
  videoType: ['3gp', 'mp4', 'mov', 'ogg'],
  docsType: ['txt', 'xls', 'xlsx', 'doc', 'docx', 'pdf', 'ppt', 'pptx', 'csv'],
}
