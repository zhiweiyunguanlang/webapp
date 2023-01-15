import { useState, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { Input, Button } from '@nutui/nutui-react-taro'
import HTTP from '@/services/HTTPService'
import { aesEncrypt } from '@/utils/crypto'
import './index.scss'

import logo from '@/assets/images/image/login_bg.jpg'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(true)

  const passwordInputObj = useMemo(() => {
    if (passwordVisible) {
      return {
        key: 'text',
        type: 'text',
        rightIcon: 'marshalling',
      }
    } else {
      return {
        key: 'password',
        type: 'password',
        rightIcon: 'eye',
      }
    }
  }, [passwordVisible])

  const handleRequest = async () => {
    console.info('handleRequest', aesEncrypt(password))
    const res = await HTTP.login({ params: { password: aesEncrypt(password), username } })
    if (res.code === 0) {
      Taro.switchTab({ url: '/pages/pipeGallery/index' })
    }
  }

  return (
    <View className="loginBody">
      <Image className="logo" src={logo} />
      <View className="loginBox">
        <Input
          onChange={(val) => setUsername(val)}
          leftIcon="my"
          leftIconSize={14}
          labelWidth={40}
          placeholder="请输入账号"
          label="账号"
        />
        <Input
          defaultValue={password}
          onChange={(val) => setPassword(val)}
          leftIcon="mima"
          rightIconSize={14}
          leftIconSize={14}
          labelWidth={40}
          placeholder="请输入密码"
          label="密码"
          onClickRightIcon={() => setPasswordVisible((val) => !val)}
          {...passwordInputObj}
        />
        <View className="registerBtn">注册账号</View>
      </View>
      <Button className="loginBtn" block type="info" disabled={!(password && username)} onClick={handleRequest}>
        登录
      </Button>
    </View>
  )
}

export default Login
