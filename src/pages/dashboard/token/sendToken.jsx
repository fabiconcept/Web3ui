import React, { useContext, useState, useEffect } from 'react';
import { contextData } from '../dashboard';

const SendToken = ({buyRef, transferRef}) => {
  const { coinBase, contract } = useContext(contextData);
  const [offr, setOffr] = useState(null);
    const [coinInfo, setCoinInfo] = useState(null);



    useEffect(() => {
        if (contract !== null) {
            setOffr(contract[0]);
        }
    }, [contract]);

    useEffect(() => {
        if (offr !== null) {
            fetchOFFR();
        }
    }, [offr, coinBase]);

    const fetchOFFR = async () => {
        if (coinBase) {
            const name = await offr.name();
            const myBalance = await offr.balanceOf(coinBase?.coinbase);
            
            const data = {
                name,
                myBalance
            }

            setCoinInfo(data);
        }
    }
  return (
    <div className="grid-card tk sd">
      <div className="flex-form">
        <div className="sec bt pb">
          {coinInfo?.myBalance ? <div className="btnx" onClick={()=>buyRef.current.click()}>Buy Token</div>: <img src="https://gineousc.sirv.com/Images/sp.gif" alt="" />}
        </div>
        <div className="sec bt pb">
          {coinInfo?.myBalance ? <div className="btnx" onClick={()=>transferRef.current.click()}>Transfer</div> : <img src="https://gineousc.sirv.com/Images/sp.gif" alt="" />}
        </div>
        <div className="sec bt pb disable">
          {coinInfo?.myBalance ? <div className="btnx">Transfer</div> : <img src="https://gineousc.sirv.com/Images/sp.gif" alt="" />}
        </div>
      </div>
    </div>
  )
}

export default SendToken;