import React, {useState, useEffect} from 'react';
import { Card, Spin, Input, Form, Button } from 'antd';
import moment from 'moment';
import { ButtonUI } from '../UI/ButtonUI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, createPost } from '../../store/actions/postsActions'

export const PostsPage = () => {

    const navigation = useNavigate();
    const dispatch = useDispatch();

    const [addPostFlag, setAddPostFlag] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        fullDescription: ''
    })

    const { posts, loading, success, errMsg } = useSelector((state) => state.posts)
    const authorized = useSelector((state) => state.users.authorized)

    useEffect(() => {
        dispatch(getPosts);
    }, [dispatch])


    const goToDetail = (id) => {
        if (id.length > 0) navigation(`/post/${id}`)
    }

    const createPostMethod = async () => {
        await createPost(dispatch, formData)
        navigation('/')
    }

    return (
        <div>

            {loading && !success && 
            <Spin size='large' tip='Loading' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
            }

            {!loading && !addPostFlag && authorized &&
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <ButtonUI label={'Create new post'} onClick={() => setAddPostFlag(!addPostFlag)} size='large'/>
                </div>
            }

            {!loading && addPostFlag &&
            <Form>
                <Form.Item label={<span style={{сolor: 'greenyellow'}}>Заголовок</span>}>
                    <Input 
                    value={formData.title} 
                    style={{backgroundColor: '#3d4149', borderColor: 'darkslategray', color: 'greenyellow'}}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </Form.Item>
                <Form.Item label={<span style={{сolor: 'greenyellow'}}>Краткое содержание</span>}>
                    <Input.TextArea 
                    rows={4} 
                    value={formData.shortDescription}
                    style={{backgroundColor: '#3d4149', borderColor: 'darkslategray', color: 'greenyellow'}}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} 
                    />
                </Form.Item>
                <Form.Item label={<span style={{сolor: 'greenyellow'}}>Полное содержание</span>}>
                    <Input.TextArea 
                    rows={4} 
                    value={formData.fullDescription}
                    style={{backgroundColor: '#3d4149', borderColor: 'darkslategray', color: 'greenyellow'}}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })} 
                    />
                </Form.Item>
                <Form.Item >
                    <Button 
                    onClick={() => createPostMethod()} 
                    style={{backgroundColor: 'gray'}}>   
                        Создать
                    </Button>
                </Form.Item>
            </Form>
            }
            <div style={{marginBottom: '20px'}}>
            {!loading && success && !addPostFlag &&
            posts && Array.isArray(posts) > 0 &&
            posts.map((item, index) => {
                return (
                <Card 
                className='POSTCARD' 
                headStyle={{border: '1px solid #ababab', color: 'white'}} 
                bodyStyle={{border: '1px solid #ababab', color: 'white'}}  
                key={item._id} 
                title={
                <span>
                    {item.title}{<ButtonUI label='DETAIL' onClick={() => goToDetail(item._id)}/>}
                </span>
                }
                >
                    <p style={{wordBreak: 'break-all'}}>{item.shortDescription}</p>
                    <br />
                    <span style={{color: 'gray'}}>{moment(item.createdDate).format('DD.MM.YYYY | H:MM:SS')}</span>
                </Card>
                )
            })
            }
            </div>
        </div>
    )
}
