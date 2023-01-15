/*
 * @Date: 2022-12-14 22:47:45
 * @LastEditors: fuhaioliang
 * @LastEditTime: 2023-01-10 00:07:30
 * @FilePath: /webapp/src/pages/index/index.tsx
 */
import { useCallback, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { useEnv, useNavigationBar, useModal, useToast } from 'taro-hooks'
import { Button, Icon, Form, FormItem, Input } from '@nutui/nutui-react-taro'
import HTTP from '@/services/HTTPService'

import logo from './hook.png'

import './index.scss'

const PipeGallery = () => {
  const env = useEnv()
  const [_, { setTitle }] = useNavigationBar({ title: 'Taro Hooks' })
  const [show] = useModal({
    title: 'Taro Hooks!',
    showCancel: false,
    confirmColor: '#8c2de9',
    confirmText: '支持一下',
    mask: true,
  })

  const [showToast] = useToast({ mask: true })

  const handleModal = useCallback(() => {
    show({ content: '不如给一个star⭐️!' }).then(() => {
      showToast({ title: '点击了支持!' })
    })
  }, [show, showToast])

  const [code, setCode] = useState(-1)

  const handleRequest = async () => {
    const { data } = await HTTP.login({ params: { password: 'ST8CDA0+NsS5S2GP1qjYcg==', username: 'admin' } })
    console.info('await', data)
  }

  return (
    <View className="wrapper">
      <Icon name="dongdong" />
      <View onClick={() => handleRequest()}>发起请求{code}</View>
      <Image className="logo" src={logo} />
      <Text className="title">为Taro而设计的Hooks Library</Text>
      <Text className="desc">目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks! 并结合ahook适配Taro!</Text>
      <View className="list">
        <Text className="label">运行环境</Text>
        <Text className="note">{env}</Text>
      </View>
      <Button type="primary" onClick={() => setTitle('Taro Hooks Nice!')}>
        设置标题
      </Button>
      <Button className="button" onClick={handleModal}>
        使用Modal
      </Button>
      <Form>
        <FormItem label="姓名" name="username">
          <Input className="nut-input-text" placeholder="请输入姓名" type="text" />
        </FormItem>
      </Form>
    </View>
  )
}

export default PipeGallery
