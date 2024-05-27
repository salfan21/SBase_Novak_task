import React, { useState } from 'react';

import '../styles/addPost.scss'

import { useDispatch } from 'react-redux';
import { addPost } from '../store/dataSliece';
import { addUserPost } from '../store/userSliece';

export const AddPost = () => {
    
    const dispatch = useDispatch()
    
    const { login, id } = JSON.parse(localStorage.user);
    const [title, setTitile] = useState('');
    const [text, setText] = useState('');
    const comments = [];
    const postId = window.crypto.randomUUID();
    
    const f = () => {
        dispatch(addPost({"id":postId,title,text,"author":login,"authorID":id,comments}));
        dispatch(addUserPost({"userId":id,"postId":postId}));
    }
    return (
        <div className='addPost'>
            <h5>Введіть ваш заголовок:</h5>
            <input type="text" value={title} onChange={(e) => setTitile(e.target.value)}/>
            <h5>Введіть текст вашого посту:</h5>
            <textarea  value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <div className='addPost_btn'><span onClick={() => f()}>Додати пост</span></div>
        </div>
    );
};