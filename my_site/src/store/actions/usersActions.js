import { store } from '../store';

export const createAccount = async (dispatch, data) => {
  try {

    console.log('Вывод до старта регистрации');
    var state = store.getState().users;
    console.log(state)

    dispatch({
      type: 'registration_start', id: '', login: '', name: '', fullname: '', email: '', authorized: false,
      errMsg: ''
    });

    console.log('Вывод после старта регистрации');
    state = store.getState().users;
    console.log(state)

    const response = await fetch(`http://localhost:3900/registration`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!responseData.ok && responseData.errMsg === 'Пользователь с таким адресом электронной почты уже существует') {
      dispatch({
        type: 'registration_error', id: '', login: '', name: '', fullname: '', email: '', authorized: false,
        errMsg: responseData.errMsg
      });

      console.log('Ошибка: данная почта уже использовалась');
      const state = store.getState().users;
      console.log(state)

      return;
    }

    dispatch({
      type: 'registration_success', id: '', login: '', name: '', fullname: '', email: '', authorized: false,
      errMsg: ''
    });

    if (responseData.ok && typeof responseData.user._id === 'string') {
      dispatch({
        type: 'login_success',
        id: responseData.user._id,
        login: responseData.user.login,
        name: responseData.user.name,
        fullname: responseData.user.fullname,
        email: responseData.user.email,
        createdDate: responseData.user.createdDate,
        authorized: true,
        errMsg: ''
      });
    }
  } catch (error) {
    dispatch({
      type: 'registration_error', id: '', login: '', name: '', fullname: '', email: '', authorized: false,
      errMsg: 'Ошибка регистрации'
    });
  }
}

export const LoginAcc = async (dispatch, data) => {
  try {
    dispatch({
      type: 'login_start', id: '', login: '', name: '', fullname: '', email: '', authorized: false,
      errMsg: ''
    });

    const response = await fetch(`http://localhost:3900/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!responseData.ok && responseData.errMsg === 'Почта или пароль введены неправильно') {
      dispatch({
        type: 'login_error', id: '', login: '', name: '', fullname: '', email: '', authorized: false,
        errMsg: responseData.errMsg
      });
      return;
    }

    if (responseData.ok && typeof responseData.user._id === 'string') {
      dispatch({
        type: 'login_success',
        id: responseData.user._id,
        login: responseData.user.login,
        name: responseData.user.name,
        fullname: responseData.user.fullname,
        email: responseData.user.email,
        createdDate: responseData.user.createdDate,
        authorized: true,
        errMsg: ''
      });
    }
  }
  catch (error) {

  }
  

}

export const Logout = async (dispatch) => {
  dispatch({ 
    type: 'logout', id: '', login: '', name: '', fullname: '', email: '', authorized: false, 
    errMsg: '' });
}