import React, { useContext, useState } from 'react';
import '../styles/preheader.scss'
import GridContext from '../HOC/Grid';
const Shop_preheader = () => {

    const wdt = window.innerWidth;
    const {gridSelect, setGridSelect, gridNumber} = useContext(GridContext)

    const [arr, setArr] = useState(['','','',''])
    
    const toggleGridSelector = (num) => {
        setGridSelect(num)
        arr.forEach((e,i) => {
            num === (i + 1) ? arr[i] = {shadow:'0px 0px 0px 10px rgba(226,228,233,1)', color: 'rgba(226,228,233,1)'} : arr[i] = {shadow:'none', color: '#f5f5f5'}
        });
    }
    
    toggleGridSelector(gridSelect)

    return (
        <div className="shop_preheader">
                <div className="shop_preheader_half1">
                </div>
                <div className="shop_preheader_half2">
                    <div className="shop_preheader_half2_item1" onClick={() => toggleGridSelector(1)} style={{'boxShadow': arr[0].shadow, "backgroundColor": arr[0].color}}><div></div><div></div></div>
                    <div className="shop_preheader_half2_item2" onClick={() => toggleGridSelector(2)} style={{"boxShadow": arr[1].shadow, "backgroundColor": arr[1].color}}><div></div><div></div><div></div><div></div></div>
                    <div className="shop_preheader_half2_item3" onClick={() => toggleGridSelector(3)} style={{"boxShadow": arr[2].shadow, "backgroundColor": arr[2].color}}><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    <div className="shop_preheader_half2_item4" onClick={() => toggleGridSelector(4)} style={{"boxShadow": arr[3].shadow, "backgroundColor": arr[3].color}}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
        </div>
    );
};

export default Shop_preheader;