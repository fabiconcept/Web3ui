import React from 'react';

const ConnectionModal = () => {
  return (
    <div className="cover">
        <div className="div">
            <div className="form cn" style={{padding: "1rem"}}>
                <label>Select wallet</label>
                <div className="close">x</div>
                <div><input type="search" className="search" placeholder='Search...' /></div>
                <div className="arr">
                    <li></li>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConnectionModal;