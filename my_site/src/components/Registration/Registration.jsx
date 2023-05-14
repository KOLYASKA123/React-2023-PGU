import React from 'react'
import {
  Button,
  Form,
  Input,
} from 'antd';
import { createAccount } from '../../store/actions/usersActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../../store/store';
import { useState, useEffect } from 'react';



export const Registration = () => {

  const dispatch = useDispatch();
  const errMsg = useSelector((state) => state.users.errMsg);
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    login: '',
    name: '',
    fullname: ''
  });
  
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    console.log(`Значение ошибки: ${errMsg}`);
    console.log(`Состояние кнопки: ${buttonPressed}`)
    if (errMsg === '' && buttonPressed) {
      navigation('/profile');
    }
    else {
      setButtonPressed(false);
    }
  }, [errMsg, buttonPressed])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async () => {
    await createAccount(dispatch, formData);
    await sendRequest();
  }

  const sendRequest = async () => {
    setButtonPressed(true);
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Email">
        <Input name="email" value={formData.email} onChange={handleChange} />
        {errMsg === 'Пользователь с таким адресом электронной почты уже существует' && <p style={{color: 'crimson'}}>{errMsg}</p>}
      </Form.Item>
      <Form.Item label="Password">
        <Input.Password name="password" value={formData.password} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Login">
        <Input name="login" value={formData.login} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Name">
        <Input name="name" value={formData.name} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Full Name">
        <Input name="fullname" value={formData.fullname} onChange={handleChange} />
      </Form.Item>
      <Button type="primary" htmlType="submit">Register</Button>
    </Form>
  )
}
