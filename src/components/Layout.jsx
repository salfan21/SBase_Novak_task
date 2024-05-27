import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Outlet } from 'react-router-dom';

import Header from './Header';
import Bottom from './Bottom';

import '../styles/global.scss'
import GridContext from '../HOC/Grid';

import {useDispatch, useSelector} from 'react-redux'
import { fetchData, addPost, addComment, fetchPostById } from '../store/dataSliece';
import { fetchUserById, loginUser, registerUser, addUserPost } from '../store/userSliece'

const Layout = () => {

    const dispatch = useDispatch()
    const dataD = {pass:"247398000AZ",login:"2Alice",name: "Alice Bebra", mail: "2AlexZimbabve@gmail.com"}
    const dataG = {userId: 'CpaP2N5', postId:200}
    
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const data = useSelector(state => state.users)
    // console.log(data)

    const [gridNumber, setGridNumber] = useState(
        window.innerWidth > 980 ? window.innerWidth > 1700? {ph:1, si: 4} : {ph:2, si: 3} : {ph:3, si: 2}
    )
    const [gridSelect, setGridSelect] = useState(2)

    return (
        <GridContext.Provider value={{gridSelect, setGridSelect, gridNumber}}>
        <div className={`App`}>
            <Header/>
            <div className="line" onClick={(e) => dispatch(addUserPost(dataG))}><p></p></div>
            <div className="main">
               <Outlet/>
            </div>
            <div className="line"><p></p></div>
            <Bottom/>
        </div>
        </GridContext.Provider>
    );
};

export default Layout; 