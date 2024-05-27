import React, { useContext } from 'react';
import Review_item from '../components/Review_item';
import '../styles/home.scss'
import Shop_preheader from '../components/PreHeader';
import GridContext from '../HOC/Grid';
import { useSelector } from 'react-redux';

export const Home = () => {

    const data = useSelector(state => state.posts.data)
    console.log(data)
    const {gridSelect, setGridSelect, gridNumber} = useContext(GridContext)
    return (
        <div>
        <Shop_preheader/>
        <div className={`home grid${gridSelect}`}>

           {data !== null ? data.map((el) => 
           <Review_item key={el.id} data={el}/>
           ): <p>loader</p>}
        </div>
        </div>
    );
};

