import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Input, View } from '@tarojs/components'
import { Form, FormItem, Button, Row, Col } from '@antmjs/vantui'
import PickerBox from '@/components/PickerBox'
import useDeptList from '@/hooks/useDeptList'

import HTTP from '@/services/HTTPService'
import { aesEncrypt } from '@/utils/crypto'

// 可以异步请求初始化，放在state里面
const initialValues = {
  username: '',
  password: '',
  name: '',
  userNo: '',
  sex: '1',
  tel: '',
  department: '',
}

function _MutiData(value) {
  return <>{JSON.stringify(value)}</>
}

function Register() {
  const formIt = Form.useForm()
  const deptList = useDeptList()

  const handleRequest = () => {
    formIt.validateFields(async (errorMessage, fieldValues) => {
      if (errorMessage && errorMessage.length) {
        return console.info('errorMessage', errorMessage)
      }
      const res = await HTTP.register({ params: { ...fieldValues, password: aesEncrypt(fieldValues.password) } })
      if (res.code === 0) {
        Taro.showToast({ title: '注册成功', icon: 'success' })
        Taro.navigateTo({ url: '/pages/login/index' })
      }
    })
  }

  useEffect(() => {
    formIt.registerRequiredMessageCallback((label) => {
      return `${label}不能为空`
    })
  }, [])

  return (
    <View style={{ padding: '36rpx' }}>
      <Form form={formIt} initialValues={initialValues}>
        <FormItem
          label="账号"
          name="username"
          trigger="onInput"
          valueFormat={(e) => e.detail.value}
          required
          validateTrigger="onBlur"
        >
          <Input placeholder="请输入账号" />
        </FormItem>
        <FormItem
          label="密码"
          name="password"
          trigger="onInput"
          valueFormat={(e) => e.detail.value}
          required
          validateTrigger="onBlur"
        >
          <Input password placeholder="请输入密码" />
        </FormItem>
        <FormItem
          label="密码确认"
          name="password2"
          trigger="onInput"
          valueFormat={(e) => e.detail.value}
          required
          validateTrigger="onBlur"
          rules={[
            {
              rule: (value, call) => {
                if (formIt.getFieldValue('password') !== value) {
                  call('两次密码不一致！')
                } else {
                  call('')
                }
              },
            },
          ]}
        >
          <Input password placeholder="请再次输入密码" />
        </FormItem>
        <FormItem
          label="姓名"
          name="name"
          trigger="onInput"
          valueFormat={(e) => e.detail.value}
          required
          validateTrigger="onBlur"
        >
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem
          label="人员编码"
          name="userNo"
          trigger="onInput"
          valueFormat={(e) => e.detail.value}
          required
          validateTrigger="onBlur"
        >
          <Input placeholder="请输入人员编码" />
        </FormItem>
        <FormItem
          label="联系方式"
          name="tel"
          trigger="onInput"
          valueFormat={(e) => e.detail.value}
          required
          rules={[
            {
              rule: /^1[3456789]\d{9}$/,
              message: '请输入正确手机号码',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input placeholder="请输入联系方式" />
        </FormItem>
        <FormItem
          label="性别"
          name="sex"
          valueFormat={(e) => e.detail.value}
          valueKey="value"
          trigger="onConfirm"
          required
          validateTrigger="onBlur"
        >
          <PickerBox
            columns={[
              {
                text: '男',
                value: '1',
              },
              {
                text: '女',
                value: '2',
              },
            ]}
          />
        </FormItem>
        <FormItem
          label="所属部门"
          name="department"
          valueFormat={(e) => e.detail.value}
          valueKey="value"
          trigger="onConfirm"
          required
          validateTrigger="onBlur"
        >
          <PickerBox columns={deptList} />
        </FormItem>
      </Form>
      <Row gutter="36">
        <Col span="12">
          <Button block type="info" plain hairline onClick={() => Taro.navigateBack()}>
            取消
          </Button>
        </Col>
        <Col span="12">
          <Button block type="info" onClick={handleRequest}>
            提交
          </Button>
        </Col>
      </Row>
    </View>
  )
}

export default Register
