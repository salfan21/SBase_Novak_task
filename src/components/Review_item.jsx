import React from 'react';
import '../styles/review.scss'

import { NavLink } from 'react-router-dom';


const Review_item = (props) => {
    return(
        <div className='review_item' key={props.data.id}>
            <NavLink to={`/account/${props.data.authorID}`} style={{color:"inherit", textDecoration:'none'}}><div className="review_item_userName">{props.data.author}</div></NavLink>
                <div className="review_item_text">{props.data.title}</div>
            <NavLink to={`/review/${props.data.id}`} style={{color:"inherit", textDecoration:'none'}}><span className='review_item_btn'>Розгорнути</span></NavLink>
        </div>
    )
};

export default Review_item;