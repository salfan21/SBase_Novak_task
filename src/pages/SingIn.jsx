import React, { useState } from 'react';
import '../styles/singIn.scss'

import { fetchUserById, loginUser, registerUser, addUserPost } from '../store/userSliece'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const SingIn = () => {

    const dispatch = useDispatch()

    const [mail, setMailValue] = useState('')
    const [pass, setPasValue] = useState('')

    const singInHeandler = () =>{
        if(mail !== '' && pass !== ''){
            dispatch(loginUser({mail,pass}))
        }else{
            console.log('err')
        }
    }

    return (
        <div className='singIn'>
            <div className='singIn_box'>
                <h6 className='singIn_box_abs'>Авторизація</h6>
                <h5>Введіть ваш логін:</h5>
                <input type="text" value={mail} onChange={(e)=>setMailValue(e.target.value)}/>  
                <h5>Введіть ваш пароль:</h5>
                <input type="text" value={pass} onChange={(e)=>setPasValue(e.target.value)}/>
                <NavLink to='/'>
                    <span className='singIn_box_btn' onClick={() => singInHeandler()}>Вхід</span>
                </NavLink>
            </div> 
       </div>
    );
};