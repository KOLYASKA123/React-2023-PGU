import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { Logout } from '../../store/actions/usersActions';
import { useDispatch } from 'react-redux';

const {Content, Footer } = Layout;

export const NavBar = (props) => {

  const dispatch = useDispatch();

  const authorized = useSelector((state) => state.users.authorized)

  const logoutUserMethod = async () => {
    await Logout(dispatch);
  }

  return (
    <div>
      <nav className='HEADERandNAV'>

        <ul className="NAVLIST">
          <li><Header /></li>
          
          {authorized && <li><Link to="/profile">Profile</Link></li>}
          
          <li><Link to="/">News</Link></li>
          <li><Link to="/about">About</Link></li>

          {!authorized && <li><Link to="/login">Log In</Link></li>}

          {authorized && <li><Link onClick={() => logoutUserMethod()} to="/login">Log Out</Link></li>}
        </ul>
      </nav>
      <Content style={{ padding: '50px 50px', marginBottom: '20px' }}>
        <div className="site-layout-content" style={{ padding: '10px'/* , height: '100vh' */}}>
          {props.children}
        </div>
      </Content>
    </div>
  )
}

export default NavBar
