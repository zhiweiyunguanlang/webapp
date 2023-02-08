import React, { useState, useCallback, useMemo } from 'react'
import { View } from '@tarojs/components'
import { Popup, Picker } from '@antmjs/vantui'
import keyBy from 'lodash/keyBy'

function PickerBox(props) {
  const { columns } = props
  const [state, changeState] = useState({
    show: false,
    innerValue: '',
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

  const onConfirm = useCallback(
    (e) => {
      const { value, index } = e.detail
      if (props.onConfirm) props.onConfirm({ detail: { index, value: value.value } })
      toggleShow(false)
    },
    [state.innerValue]
  )

  const onCancel = useCallback(() => {
    if (props.onCancel) props.onCancel()
    toggleShow(false)
  }, [])

  const { value } = props

  const columnskeyByValue = useMemo(() => {
    return keyBy(columns, 'value')
  }, [columns])

  return (
    <>
      <View onClick={() => toggleShow(true)} style={{ minWidth: '200px' }}>
        {value ? columnskeyByValue[value]?.text : '请选择'}
      </View>
      <Popup position="bottom" show={state.show} onClose={() => toggleShow(false)}>
        <Picker
          columns={columns}
          onChange={(e) => setState('innerValue', e.detail.value.value)}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </Popup>
    </>
  )
}

export default PickerBox
