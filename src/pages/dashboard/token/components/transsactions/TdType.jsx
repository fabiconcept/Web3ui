import React, { useEffect, useState } from 'react';

const TdType = ({type}) => {
    const [text, setText] = useState('');

    useEffect(()=>{
        switch (type) {
            case 1:
                setText("Buytokens");
                break;
            case 2:
                setText("Transfer");
                break;
        
            default:
                setText("Approve");
                break;
        }
    }, [type]);
    
  return (
    <td className='mb'><div className="type">{text}</div></td>
  )
}

export default TdType;