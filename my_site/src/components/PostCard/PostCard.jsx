import React from 'react';
import Card from 'antd/es/card/Card';

const PostCard = ({ post }) => {
    return (
      <Card title={post.title} className='POSTCARD'>
        <p>{post.body}</p>
      </Card>
    );
  };

export default PostCard;