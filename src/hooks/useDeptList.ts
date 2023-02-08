import { useState, useEffect } from 'react'
import HTTP from '@/services/HTTPService'

export default function useDeptList() {
  const [list, setList] = useState([])
  const getData = async () => {
    const res = await HTTP.deptList({})
    if (res.code === 0) {
      const data = res?.data?.map(({ id, deptName }) => ({ text: deptName, value: id }))
      setList(data || [])
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return list
}
