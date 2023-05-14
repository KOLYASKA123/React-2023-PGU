import { Layout } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const {Content} = Layout;

export const Profile = () => {
    const login = useSelector((state) => state.users.login)
    const name = useSelector((state) => state.users.name)
    const fullname = useSelector((state) => state.users.fullname)
    const email = useSelector((state) => state.users.email)
    const id = useSelector((state) => state.users.id)
    const date = useSelector((state) => state.users.createdDate);

    const user = useSelector((state) => state.users)
    console.log(user)
  return (
    <Content>
        <h2>Логин: {login}</h2>
        <h2>Имя: {name}</h2>
        <h2>Полное имя: {fullname}</h2>
        <h2>Email: {email}</h2>
        <h2>ID: {id}</h2>
        <h2>Дата регистрации: {moment(date).format('DD.MM.YYYY | H:MM:SS')}</h2>
    </Content>
  )
}
