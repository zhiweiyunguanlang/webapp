import React, { useState, useCallback } from 'react'
import { View } from '@tarojs/components'
import { Popup, DatetimePicker } from '@antmjs/vantui'

function DatetimePickerBox(props) {
  const [state, changeState] = useState({
    show: false,
    innerValue: null,
  })

  const setState = useCallback(
    (key, value) => {
      changeState({
        ...state,
        [key]: value,
      })
    },
    [state]
  )

  const toggleShow = useCallback((show) => {
    setState('show', show)
  }, [])

  const onConfirm = useCallback((e) => {
    console.info('e -->', e)
    if (props.onConfirm) props.onConfirm(e)
    toggleShow(false)
  }, [])

  const onCancel = useCallback(() => {
    if (props.onCancel) props.onCancel()
    toggleShow(false)
  }, [])

  const preFixZero = useCallback((n) => {
    return n > 9 ? `${n}` : `0${n}`
  }, [])

  const formatDate = useCallback((date) => {
    const d = new Date(date)
    return `${d.getFullYear()}-${preFixZero(Number(d.getMonth() + 1))}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  }, [])

  const onChange = useCallback((e) => {
    setState('innerValue', e.detail.datetimePicker.innerValue)
  }, [])

  const { value } = props

  return (
    <>
      <View onClick={() => toggleShow(true)} style={{ minWidth: '200px' }}>
        {value ? formatDate(value) : '请选择日期'}
      </View>
      <Popup position="bottom" show={state.show} onClose={() => toggleShow(false)}>
        <DatetimePicker type="datetime" value={state.innerValue || value} onConfirm={onConfirm} onCancel={onCancel} />
      </Popup>
    </>
  )
}

export default DatetimePickerBox
