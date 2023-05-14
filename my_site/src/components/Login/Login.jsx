import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginAcc } from '../../store/actions/usersActions';

export const Login = () => {

  const dispatch = useDispatch();
  const errMsg = useSelector((state) => state.users.errMsg);
  const navigation = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    await LoginAcc(dispatch, formData);
    await sendRequest();
  }

  const sendRequest = async () => {
    setButtonPressed(true);
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <Form onFinish={handleSubmit}>
      <Form.Item label="Email">
        <Input name="email" value={formData.email} onChange={handleChange} />
        {errMsg === 'Почта или пароль введены неправильно' && <p style={{color: 'crimson'}}>{errMsg}</p>}
      </Form.Item>
      <Form.Item label="Password">
        <Input.Password name="password" value={formData.password} onChange={handleChange} />
      </Form.Item>
      <Form.Item>
      <Button type="primary" htmlType="submit">Log In</Button>
       <span style={{marginLeft: '20px'}}> Or <Link style={{color: 'crimson'}} to="/registration">register now!</Link></span>
      </Form.Item>
    </Form>
  </div>
  )
}