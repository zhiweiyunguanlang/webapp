import { useState, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { Field, Button, Icon } from '@antmjs/vantui'
import HTTP from '@/services/HTTPService'
import { aesEncrypt } from '@/utils/crypto'
import './index.less'

import logo from '@/assets/images/image/login_bg.jpg'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const passwordInputObj = useMemo(() => {
    if (passwordVisible) {
      return {
        password: false,
        renderRightIcon: <Icon name="eye-close" size="36rpx" onClick={() => setPasswordVisible((val) => !val)} />,
      }
    } else {
      return {
        password: true,
        renderRightIcon: <Icon name="yuedu" size="36rpx" onClick={() => setPasswordVisible((val) => !val)} />,
      }
    }
  }, [passwordVisible])

  const handleRequest = async () => {
    const res = await HTTP.login({ params: { password: aesEncrypt(password), username } })
    if (res.code === 0) {
      Taro.showToast({ title: '登录成功', icon: 'success' })
      Taro.switchTab({ url: '/pages/pipeGallery/index' })
    }
  }

  return (
    <View className="loginBody">
      <Image className="logo" src={logo} />
      <View className="loginBox">
        <Field
          onChange={(e) => setUsername(e.detail)}
          leftIcon="user"
          titleWidth="80"
          placeholder="请输入账号"
          label="账号"
        />
        <Field
          value={password}
          onChange={(e) => setPassword(e.detail)}
          titleWidth="80"
          leftIcon="mima"
          placeholder="请输入密码"
          label="密码"
          {...passwordInputObj}
        />
        <Field
          value={password}
          onChange={(e) => setPassword(e.detail)}
          titleWidth="80"
          leftIcon="mima"
          placeholder="请输入密码"
          label="密码"
          {...passwordInputObj}
        />
        <View className="registerBtn" onClick={() => Taro.navigateTo({ url: '/pages/register/index' })}>
          注册账号
        </View>
      </View>
      <Button className="loginBtn" block type="info" disabled={!(password && username)} onClick={handleRequest}>
        登录
      </Button>
    </View>
  )
}

export default Login
