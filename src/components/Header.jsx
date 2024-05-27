import React from 'react';
import '../styles/header.scss'
import { NavLink } from 'react-router-dom';
const Header = () => {

    const locStorUserId = localStorage.length <= 1 ? false : JSON.parse(localStorage.user).id.length >= 1

    return (
        <div className='header' onClick={()=>console.log(locStorUserId)}>
            <NavLink to={'/'}><div className="logo"></div></NavLink>
             
            <div className="acc">
                {locStorUserId === false  && <h5 className="register"><NavLink to={'register'} style={{color:'inherit', textDecoration:'none'}}><span>Реєстрація</span></NavLink></h5>}
                {
                    locStorUserId === false ?
                    <h5 className="singIN"><NavLink to={'singIn'} style={{color:'inherit', textDecoration:'none'}}><span>Вхід</span></NavLink></h5>
                    : <h5 className="singIN"><NavLink to={`account/${JSON.parse(localStorage.user).id}`} style={{color:'inherit', textDecoration:'none'}}><span>Аккаунт</span></NavLink></h5>
                }
            </div>
            
        </div>
    );
};

export default Header;