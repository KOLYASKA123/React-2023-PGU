import './App.css';
import './styles/mystyle.css';
import NavBar from './components/NavBar/NavBar';
import { PostsPage } from './components/PostsPage/PostsPage';
import { PostPage } from './components/PostPage/PostPage';
import { Login } from './components/Login/Login';
import { Routes, Route } from 'react-router-dom'
import { Registration } from './components/Registration/Registration';
import { Profile } from './components/Profile/Profile';

function App() {

  return(
    <>
    <NavBar>
      <Routes>
        <Route path='/' element={<PostsPage />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/post/:id' element={<PostPage />}/>
        <Route path='/registration'element={<Registration />}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </NavBar>
    </>
  )
}

export default App;