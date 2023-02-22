import { ethers } from 'ethers';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import {  formatNum } from '../../../useful/useful_tool';
import { ABI2 } from '../../../util/constants/daiContract';
import { contextData } from '../dashboard';

const UserCard = ({ setSettingDp }) => {
    const { storeDataUser, coinBase, setLogOut, contract } = useContext(contextData);
    const [user, setUser]= useState(null);
    const [coinbase, setCoinbase]= useState(null);
    const [usdc, setUsdc] = useState(0);

    const getUSDC = async() =>{
        // Request the user's Ethereum accounts
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the contract signer
        const signer = await provider.getSigner(); 
        const address = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

        // Connect to the contract
        const USDC = new ethers.Contract(address, ABI2, signer);
        const userBalance = await (USDC.balanceOf(coinBase.coinbase));
        const decimals =  6*2;
        const value = ethers.utils.formatEther(userBalance) * (10**decimals);
        setUsdc(formatNum(value));
    }

    useEffect(()=>{
        if (storeDataUser !== null) {
            setUser(storeDataUser);
            setCoinbase(coinBase);
            getUSDC();
        }
    },[storeDataUser, coinBase]);

    

    return (
        <div className="usercard">
            <div className="top">
                {user ? user.name : "@username" }
            </div>
            <div className="infocard br">
                <div className="profile-circle">
                    <div className="img" onClick={() => user && setSettingDp(true)}>
                        {user && <img src={user?.dp} alt="" />}
                        {!user && <img src="https://gineousc.sirv.com/Images/Infinite.gif" alt="" />}
                    </div>
                </div>
                <div className="info">
                    <div className="title">{ user ? user.name : "@username" }</div>
                    <div className="p">
                        {user ? user.email : "example@mail.com"}
                    </div>
                    <div className="btnx" onClick={()=>setLogOut(true)}>disconnect</div>
                </div>
            </div>
            <div className="infocard">
                <div className="top">
                    <div className="card-ico"><img src="https://gineousc.sirv.com/Images/icons/usdc.png" alt="" /></div>
                </div>
                <div className="details">{usdc} USDC</div>
                <div className="p">Your USDC Balance</div>
            </div>
            <div className="infocard">
                <div className="top">
                    <div className="card-ico"><img src="https://gineousc.sirv.com/Images/icons/eth.png" alt="" /></div>
                </div>
                <div className="details">{ coinbase?.balance ? (formatNum((coinbase?.balance))) : <img src="https://gineousc.sirv.com/Images/sp.gif" alt="" /> } ETH</div>
                <div className="p">Your Eth Balance</div>
            </div>
            <div className="infocard">
                <div className="title">Dividend Pay</div>
                <div className="s">in Progress</div>
                <div className="prog-bar">
                    <div className="bar"></div>
                </div>
                <div className="info">
                    <div className="t-s">Next Dividend payday</div>
                    <div className="p">4-5 business days</div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;