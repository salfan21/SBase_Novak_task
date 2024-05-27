import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux'
import { fetchPostById, addComment } from '../store/dataSliece';

export const Review = () => {
    const location = useLocation()

    const dispatch = useDispatch();

    const locStorUserId = localStorage.length <= 1 ? false : JSON.parse(localStorage.user).id.length >= 1
    const postId =  useLocation().pathname.split('/')[2];

    const post = useSelector(state => state.posts.onePost)
    useEffect(() => {
        dispatch(fetchPostById(postId));
    }, [dispatch, postId]);

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState('')

    const addCommentHeandler = () =>{
        if(comment !== '' ){
            dispatch(addComment({postId, "comment": {"author": JSON.parse(localStorage.user).login, "authorID": JSON.parse(localStorage.user).id, "text": comment}}))
            setComment('') 
            setComments({"author": JSON.parse(localStorage.user).login, "authorID": JSON.parse(localStorage.user).id, "text": comment})
        }else{
            
        }
        dispatch(fetchPostById(postId))
    }

    return post !== null && (
        <div className='review'>
            <NavLink to={`/account/${post.authorID}`} style={{color:"inherit", textDecoration:'none'}}><div className="review_userName"><h3>{post.author}</h3></div></NavLink>
            <div className="review_title"><h3>{post.title}</h3></div>
            <div className="review_text">{post.text}</div>
            <h4>Коментарі:</h4>
            <div className="review_comments">
                {post.comments.map(el => 
                    <div className="review_comments_item" key={window.crypto.randomUUID()}>
                        <div className="review_comments_item_userName">{el.author}</div>
                        <div className="review_comments_item_text">{el.text}</div>
                    </div>
                )}
                {comments !== '' && <div className="review_comments_item" key={window.crypto.randomUUID()}>
                        <div className="review_comments_item_userName">{comments.author}</div>
                        <div className="review_comments_item_text">{comments.text}</div>
                </div>}
            </div>

            {locStorUserId && 
            <div className="review_add_comment">
                <h5>Ваш коментар:</h5>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
                <div className="review_add_comment_btn"><span onClick={() => {addCommentHeandler()}}>Додати коментар</span></div>
            </div>}
        </div>
    );
};

