import React from 'react'
import { useTranslation } from 'react-i18next';
import UserCharts from './UserCharts'
import UserList from './UserList'

const UserBar = () => {
  let { t } = useTranslation(["home"]);
  return (
   <div className="grid grid-cols-2 gap-x-4">
    <UserCharts />
    <UserList />
   </div>
  )
}

export default UserBar