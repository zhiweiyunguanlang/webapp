/*
 * @Date: 2020-11-02 22:10:55
 * @LastEditors: fuhaioliang
 * @LastEditTime: 2022-12-07 23:09:48
 * @FilePath: /taro-cli/src/custom-tab-bar/index.tsx
 */
import Taro from '@tarojs/taro'
import { Tabbar, TabbarItem } from '@nutui/nutui-react-taro'

const CustomTabBar = () => {
  const switchTab = (index, item) => {
    const url = '/' + item.pagePath
    Taro.switchTab({
      url: url,
    })
  }
  //
  return (
    <Tabbar
      tabSwitch={(child, idx) => {
        console.log(idx)
      }}
    >
      <TabbarItem tabTitle="首页" icon="dongdong" />
      <TabbarItem tabTitle="分类" icon="dongdong" />
      <TabbarItem tabTitle="发现" icon="dongdong" />
      <TabbarItem tabTitle="购物车" icon="dongdong" />
      <TabbarItem tabTitle="我的" icon="dongdong" />
    </Tabbar>
  )
}

export default CustomTabBar
