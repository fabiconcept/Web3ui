import React from 'react';
import { useContext } from 'react';
import { navdata } from './navArea';

const Controls = () => {
    const { setExpand } = useContext(navdata)
    return (
        <div className="controls">
            <div onClick={()=>setExpand(1)}> <img src="https://gineousc.sirv.com/Images/icons/mn.png" alt="" /> </div>
            <div onClick={()=>setExpand(2)}> <img src="https://gineousc.sirv.com/Images/icons/mr.png" alt="" /> </div>
            <div onClick={()=>setExpand(3)}> <img src="https://gineousc.sirv.com/Images/icons/me.png" alt="" /> </div>
        </div>
    )
}

export default Controls;