/*
 * @Date: 2022-12-14 22:47:45
 * @LastEditors: fuhaioliang
 * @LastEditTime: 2022-12-14 22:48:46
 * @FilePath: /taro-webapp/myapp-react/src/pages/index/index.tsx
 */
import React, { useCallback } from "react";
import { View, Text, Image } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import { Button } from '@nutui/nutui-react-taro';
import logo from "./hook.png";

import './index.scss'

const Index = () => {
  const env = useEnv();
  const [_, { setTitle }] = useNavigationBar({ title: "Taro Hooks" });
  const [show] = useModal({
    title: "Taro Hooks!",
    showCancel: false,
    confirmColor: "#8c2de9",
    confirmText: "支持一下",
    mask: true,
  });
  const [showToast] = useToast({ mask: true });

  const handleModal = useCallback(() => {
    show({ content: "不如给一个star⭐️!" }).then(() => {
      showToast({ title: "点击了支持!" });
    });
  }, [show, showToast]);

  return (
    <View className='wrapper'>
      <Image className='logo' src={logo} />
      <Text className='title'>为Taro而设计的Hooks Library</Text>
      <Text className='desc'>
        目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks!
        并结合ahook适配Taro!
      </Text>
      <View className='list'>
        <Text className='label'>运行环境</Text>
        <Text className='note'>{env}</Text>
      </View>
      <Button type='primary' onClick={() => setTitle("Taro Hooks Nice!")}>
        设置标题
      </Button>
      <Button className='button' onClick={handleModal}>
        使用Modal
      </Button>
    </View>
  );
};

export default Index;
