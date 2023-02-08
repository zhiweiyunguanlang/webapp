export default {
  pages: [
    'pages/login/index',
    'pages/register/index',
    'pages/pipeGallery/index',
    'pages/upcoming/index',
    'pages/material/index',
    'pages/my/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#CCA773',
    backgroundColor: '#ffffff',
    list: [
      {
        text: '管廊',
        pagePath: 'pages/pipeGallery/index',
        iconPath: 'assets/images/icons/tab_home.png',
        selectedIconPath: 'assets/images/icons/tab_home_selected.png',
      },
      {
        text: '待办',
        pagePath: 'pages/upcoming/index',
        iconPath: 'assets/images/icons/tab_sort.png',
        selectedIconPath: 'assets/images/icons/tab_sort_selected.png',
      },
      {
        text: '资料库',
        pagePath: 'pages/material/index',
        iconPath: 'assets/images/icons/tab_shop.png',
        selectedIconPath: 'assets/images/icons/tab_shop_selected.png',
      },
      {
        text: '我的',
        pagePath: 'pages/my/index',
        iconPath: 'assets/images/icons/tab_user.png',
        selectedIconPath: 'assets/images/icons/tab_user_selected.png',
      },
    ],
  },
}
