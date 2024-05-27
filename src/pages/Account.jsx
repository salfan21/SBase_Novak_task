import React, { useEffect, useState } from 'react';

import '../styles/account.scss'

import Review_item from '../components/Review_item';

import { Link, NavLink, useLocation } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux'
import { clearUser, fetchUserById, clearUserStor } from '../store/userSliece'

export const Account = () => {

    const dispatch = useDispatch();

    const userId =  useLocation().pathname.split('/')[2];

    useEffect(() => {
        dispatch(fetchUserById(userId));
    }, [dispatch]);

    const user = useSelector(state => state.users.user);
    const dataS = useSelector(state => state.posts.data)

    const data = dataS !== null ? dataS.filter(el => el.authorID === userId) : null

    const locStorUserId = localStorage.length <= 1 ? false : JSON.parse(localStorage.user).id === userId

    // const funk = () =>{
    //     Link
    // }

    return user !== null && (
        <div className='account'>
            <div className="account_info">
                <div className="account_info_half1">
                    <div className="account_info_half1_i"></div>
                    <div className="account_info_half1_l"><p>Login: {user.login}</p></div>
                    <div className="account_info_half1_n"><p>Name: {user.name}</p></div>
                    <div className="account_info_half1_m">Email: {user.mail}</div>
                </div>
                
                <div className="account_info_half2">
                    <p>Posts: {user.userPosts.length}</p>
                </div>
            </div>

            <div className="account_posts">
                {data !== null ? data.map((el) => 
                    <Review_item key={el.id} data={el}/>
                ): <p>loader</p>}
            </div>
            <div className="account_buttons">
                {locStorUserId && <NavLink to='addPost' style={{color:'inherit', textDecoration:'none'}}><div className='account_add'><span>Додати допис</span></div></NavLink>}
                {locStorUserId && <div className='account_exit' ><NavLink to='/' style={{color:'inherit', textDecoration:'none'}}><span onClick={() => localStorage.clear()}>Вийти з аккаунту</span></NavLink></div>}
            </div>
        </div>
    );
};