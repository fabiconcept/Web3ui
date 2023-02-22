import React from 'react';
import { greetUser } from '../../../useful/useful_tool';

const Userprofile = () => {
  return (
    <div className="dash_section">
      <div className="greet">
        <div className="title">{greetUser()}</div>
        <div className="tags">
          
        </div>
      </div>
    </div>
  )
}

export default Userprofile;