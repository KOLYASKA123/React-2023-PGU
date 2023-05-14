import React from 'react';
import { Button } from 'antd';

export const ButtonUI = ({label, onClick, size}) => {
  return (
    <Button 
    style={{
        margin: '20px', 
        fontFamily: 'Lucida Console',
        backgroundColor: 'gray',
    }} 
    type='primary'
    size={size}
    onClick={onClick}
    >
        {label}
    </Button>
  )
}
