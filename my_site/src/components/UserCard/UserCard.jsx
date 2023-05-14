import React from "react";
import { Card } from 'antd';
import UserPosts from "../UserPosts/UserPosts";

const UserCard = ({ user }) => {
  
    return (
      <div className="USER">
          <Card title={user.name} shadow="hower" >
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <UserPosts userId={user.id} />
          </Card>
      </div>
    );
  };

  export default UserCard;