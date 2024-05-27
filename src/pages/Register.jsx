import React, { useState } from 'react';
import '../styles/register.scss'

import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchUserById, loginUser, registerUser, addUserPost } from '../store/userSliece'

export const Register = () => {

    const dispatch = useDispatch()

    const [login, setLogRegValue] = useState('')
    const [pass, setPasRegValue] = useState('')
    const [mail, setMailRegValue] = useState('')
    const [name, setNameRegValue] = useState('')

    const regHeandler = () =>{
        if(login !== '' && pass !== '' && mail !== '' && name !== ''){
            dispatch(registerUser({pass,login,name,mail}))
        }else{
            console.log('err')
        }
    }

    return (
        <div className='register'>
            <div className='register_box'>
                <h6 className='register_box_abs'>Реєстрація</h6>
                <h5>Введіть ваш логін:</h5>
                <input type="text" value={login} onChange={(e)=>setLogRegValue(e.target.value)}/>  
                <h5>Введіть вашу пошту:</h5>
                <input type="text" value={mail} onChange={(e)=>setMailRegValue(e.target.value)}/>
                <h5>Введіть ваше ім'я:</h5>
                <input type="text" value={name} onChange={(e)=>setNameRegValue(e.target.value)}/>
                <h5>Введіть ваш пароль:</h5>
                <input type="text" value={pass} onChange={(e)=>setPasRegValue(e.target.value)}/>
                <NavLink to='/'><span className='register_box_btn' onClick={() => regHeandler()}>Зареєструватися</span></NavLink>
            </div> 
        </div>
    );
};