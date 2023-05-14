import React, {useEffect, useState} from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Layout, Spin, Form, Input, Button, Typography } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, updatePost } from '../../store/actions/postsActions';
import { ButtonUI } from '../UI/ButtonUI';

const {Content} = Layout;

const { Text } = Typography;

export const PostPage = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const { loading, posts, success } = useSelector((state) => state.posts)


  const [editedPost, setEditedPost] = useState({
    title: '',
    short_desc: '',
    full_desc: ''
  })

  const [showEditForm, setShowEditForm] = useState(false)


  const { id } = params

  useEffect(() => {
    getPost(dispatch, id)
    // console.log(Array.isArray(posts[0].fullDescription))
  }, [dispatch])

  useEffect(() => {
    setEditedPostMethod()
  }, [posts])

  const setEditedPostMethod = () => {
    if (Array.isArray(posts) && posts.length > 0) {
      setEditedPost({
        ...editedPost,
        title: posts[0].title,
        shortDescription: posts[0].shortDescription,
        fullDescription: posts[0].fullDescription,
      })
    }

  }

  const updatePostMethod = () => {
    updatePost(dispatch, id, editedPost)
    setShowEditForm(!showEditForm);
    navigation(`/post/${id}`)
  }

  return (
    <>
        {
            loading && !success &&
            <Spin size='large' tip='Loading' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
        }
        {
            !loading && success && !showEditForm &&
            <div style={{textAlign: 'center'}}>
                <ButtonUI label={'Edit'} onClick={() => setShowEditForm(!showEditForm)} size='large'/>
            </div>
        }
        {!loading && showEditForm &&
        <div>
            <Form >
                <Form.Item label={<span style={{сolor: 'greenyellow'}}>Заголовок</span>}>
                    <Input 
                    value={editedPost.title} 
                    style={{backgroundColor: '#3d4149', borderColor: 'darkslategray', color: 'greenyellow'}} 
                    onChange={(e) => setEditedPost({...editedPost, title: e.target.value}) }
                    />
                </Form.Item>
                <Form.Item label={<span style={{сolor: 'greenyellow'}}>Краткое содержание</span>}>
                    <Input.TextArea 
                    rows={4} 
                    value={editedPost.shortDescription} 
                    style={{backgroundColor: '#3d4149', borderColor: 'darkslategray', color: 'greenyellow'}} 
                    onChange={(e) => setEditedPost({...editedPost, shortDescription: e.target.value}) } />
                </Form.Item>
                <Form.Item label={<span style={{сolor: 'greenyellow'}}>Полное содержание</span>}>
                    <Input.TextArea 
                    rows={4} 
                    value={editedPost.fullDescription} 
                    style={{backgroundColor: '#3d4149', borderColor: 'darkslategray', color: 'greenyellow'}} 
                    onChange={(e) => setEditedPost({...editedPost, fullDescription: e.target.value}) } />
                </Form.Item>
                <Form.Item >
                    <Button onClick={() => updatePostMethod()} style={{backgroundColor: 'gray'}}>Сохранить</Button>
                </Form.Item>
            </Form>
        </div>
      }
        { !loading && success && posts && !showEditForm &&
        posts.map(post => {
            return (
                <Content className='POSTPAGE_CONTENT' key={post._id} >
                <div>
                    <p style={{textAlign: 'center', color: 'gray'}}>{moment(post.createdDate).format('DD.MM.YYYY | H:MM:SS')}</p>
                    <h1 style={{textAlign: 'center'}}>{post.title}</h1>
                    <br />
                    <h2 style={{textAlign: 'justify', textIndent: '1em'}}>
                        {post.shortDescription}
                    </h2>
                    <br />
                    <hr style={{border: '1px solid #ababab', marginBottom: '50px'}}/>
                    <div>
                    {post.fullDescription.split('\n').map((par) => {
                        return <p style={{textAlign: 'justify', textIndent: '1em'}} >{par}</p>
                    })}
                    </div>
                </div>
                </Content>
            )

        })
        }
    </>
  )
}
