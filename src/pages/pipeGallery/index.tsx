import { View } from '@tarojs/components'
import { Button } from '@antmjs/vantui'
import './index.less'

function pipeGallery() {
  return (
    <View className="index">
      <View>
        <Button type="info">Hello world!</Button>
      </View>
      <View>上面的按钮的颜色已经通过全局主题重写覆盖了，参见src/styles/index.less</View>
    </View>
  )
}

export default pipeGallery
