import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { navdata } from './navArea';

const NavBar = () => {
  const { expand } =  useContext(navdata)
  const { id } = useParams();
  const [navPosition, setNavPosition]= useState(0);
  
  useEffect(()=>{
    switch (id) {
      case "":
        setNavPosition(0);
        break;
      case undefined:
        setNavPosition(0);
        break;
      case "wallet":
        setNavPosition(1);
        break;
      case "transactions":
        setNavPosition(2);
        break;
      case "settings":
        setNavPosition(4);
        break;
    
      default:
        setNavPosition(0);
        break;
    }
  }, [id]);

  return (
    <div className={`navBar ${expand === 3 && "open"} ${expand === 2 && ""} ${expand === 1 && "hide"}`}>
      <section>
        <section className='logo'><img src="https://gineousc.sirv.com/Images/loader-ico.png" alt="" /></section>
        <Link to={"/dashboard"}><div onClick={()=>setNavPosition(0)} className={`overview ${navPosition === 0 && 'active'}`}><img src="https://gineousc.sirv.com/Images/icons/home.svg" alt="" /> {expand === 3 && <span className="txt">overview</span>}</div></Link>
        <Link to={"/dashboard/wallet"}><div onClick={()=>setNavPosition(1)} className={`wallet ${navPosition === 1 && 'active'}`}><img src="https://gineousc.sirv.com/Images/icons/usd-circle.svg" alt="" /> {expand === 3 && <span className="txt">Buy OFFR</span>}</div></Link>
        <Link to={"/dashboard/transactions"}><div onClick={()=>setNavPosition(2)} className={`transactions ${navPosition === 2 && 'active'}`}><img src="https://gineousc.sirv.com/Images/icons/list-alt.svg" alt="" /> {expand === 3 && <span className="txt">transactions</span>}</div></Link>
      </section>
      <section>
        <Link to={"/dashboard/settings"}><div onClick={()=>setNavPosition(4)} className={`setting ${navPosition === 4 && 'active'}`}><img src="https://gineousc.sirv.com/Images/icons/set.png" alt="" /> {expand === 3 && <span className="txt">settings</span>}</div></Link>
      </section>
    </div>
  )
}

export default NavBar;