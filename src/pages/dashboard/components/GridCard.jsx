import React from 'react'
import { useState } from 'react'

const GridCard = ({ico, detail, p}) => {
    const [isEmpty, setIsEmpty] = useState(false);

    return (
        <div className="grid-card">
            <div className="top">
                <div className="card-ico"><img src={ico} alt="" /></div>
                <div className="ellipsis"><img src="https://gineousc.sirv.com/Images/icons/ellipsis-v.svg" alt="" /></div>
            </div>
            <div className="details">{detail ? <span>{detail}</span> : <img src="https://gineousc.sirv.com/Images/sp.gif" alt="" />}</div>
            <div className="p">{p}</div>
        </div>
    )
}

export default GridCard